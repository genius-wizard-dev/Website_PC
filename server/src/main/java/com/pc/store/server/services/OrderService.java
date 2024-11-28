package com.pc.store.server.services;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.text.DecimalFormat;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import com.pc.store.server.dao.CartRepository;
import com.pc.store.server.dao.CustomerRepository;
import com.pc.store.server.dao.OrderRepository;
import com.pc.store.server.dto.request.OrderCreationRequest;
import com.pc.store.server.entities.*;
import com.pc.store.server.exception.AppException;
import com.pc.store.server.exception.ErrorCode;

import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Service
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Slf4j
public class OrderService {
    CustomerRepository customerRepository;
    OrderRepository orderRepository;
    EmailService emailService;
    CartRepository cartRepository;

    public boolean saveOrder(OrderCreationRequest request) {
        log.info(request.getCustomerId());
        Customer customer = customerRepository
                .findById(new ObjectId(request.getCustomerId()))
                .orElseThrow(() -> new AppException(ErrorCode.CUSTOMER_NOT_FOUND));
        Order order = Order.builder()
                .customer(customer)
                .shipAddress(request.getShipAddress())
                .items(request.getItems())
                .totalPrice(request.getTotalPrice())
                .orderDate(request.getOrderDate())
                .orderStatus(OrderStatus.valueOf(request.getOrderStatus()))
                .isPaid(request.getIsPaid().equals("true"))
                .build();
        orderRepository.save(order);
        try {
            String emailBody = generateOrderEmailContent(order);
            emailService.sendOrderConfirmation(customer.getEmail(), "Order Confirmation", emailBody);
        } catch (Exception e) {
            e.printStackTrace();
        }
        // Tìm Cart dựa trên customerId
        Cart cart = cartRepository
                .findByCustomerId(new ObjectId(request.getCustomerId()))
                .orElseThrow(() -> new AppException(ErrorCode.CART_NOT_FOUND));
        cart.getItems().clear();
        cartRepository.save(cart);
        return true;
    }

    public List<Order> getAllOrders(ObjectId customerId) {
        return orderRepository.findAllByCustomerId(customerId);
    }

    public Order updateOrderStatus(ObjectId orderId, String status) {
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));
        order.setOrderStatus(OrderStatus.valueOf(status));
        return orderRepository.save(order);
    }

    public String generateOrderEmailContent(Order order) {
        BufferedReader reader = new BufferedReader(new InputStreamReader(
                Objects.requireNonNull(getClass().getResourceAsStream("/templates/order-template.html")),
                StandardCharsets.UTF_8));
        String htmlTemplate = reader.lines().collect(Collectors.joining("\n"));
        StringBuilder orderItemsHtml = new StringBuilder();
        DecimalFormat df = new DecimalFormat("#,###.00");
        for (CartItem item : order.getItems()) {
            orderItemsHtml
                    .append("<tr>")
                    .append("<td>")
                    .append(item.getProduct().getName())
                    .append("</td>")
                    .append("<td class=\"text-center\">")
                    .append(item.getQuantity())
                    .append("</td>")
                    .append("<td class=\"text-right\">")
                    .append(df.format(item.getProduct().getPriceAfterDiscount()))
                    .append(" VND</td>")
                    .append("</tr>");
        }

        return htmlTemplate
                .replace("{{orderItems}}", orderItemsHtml.toString())
                .replace("{{totalPrice}}", df.format(order.getTotalPrice()))
                .replace("{{shipAddress}}", order.getShipAddress())
                .replace("{{paymentStatus}}", order.isPaid() ? "Đã thanh toán" : "Chưa thanh toán");
    }
}
