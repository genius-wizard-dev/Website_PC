package com.pc.store.server.services;

import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.pc.store.server.dao.CustomerRepository;
import com.pc.store.server.dao.RoleRepository;
import com.pc.store.server.dto.request.CustomerCreationResquest;
import com.pc.store.server.dto.response.CustomerResponse;
import com.pc.store.server.entities.Customer;
import com.pc.store.server.entities.Role;
import com.pc.store.server.exception.AppException;
import com.pc.store.server.exception.ErrorCode;
import com.pc.store.server.mapper.CustomerMapper;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CustomerService {

    final CustomerRepository customerRepository;
    final MongoTemplate mongoTemplate;
    final PasswordEncoder passwordEncoder;
    final CustomerMapper customerMapper;
    final RoleRepository roleRepository;

    public CustomerResponse createCustomer(CustomerCreationResquest customerCreationResquest) {
        synchronized (this) {
            Query query = new Query();
            query.addCriteria(Criteria.where("userName").is(customerCreationResquest.getUserName()));
            if (mongoTemplate.exists(query, Customer.class)) {
                throw new AppException(ErrorCode.CUSTOMER_EXISTED);
            }
            Update update = new Update();
            update.set("userName", customerCreationResquest.getUserName());
            update.set("firstName", customerCreationResquest.getFirstName());
            update.set("lastName", customerCreationResquest.getLastName());
            update.set("email", customerCreationResquest.getEmail());
            update.set("phoneNumber", customerCreationResquest.getPhoneNumber());
            update.set("password", passwordEncoder.encode(customerCreationResquest.getPassword()));
            Customer customer = mongoTemplate.findAndModify(
                    query,
                    update,
                    FindAndModifyOptions.options().returnNew(true).upsert(true),
                    Customer.class);
            assert customer != null;
            updateRoleForUser(customer.getUserName(), "USER");
            return customerMapper.toCustomerResponse(customer);
        }
    }

    public void updateRoleForUser(String userName, String roleName) {
        Role role = roleRepository.findById(roleName).orElseThrow(() -> new AppException(ErrorCode.ROLE_NOT_EXISTED));
        mongoTemplate
                .update(Customer.class)
                .matching(Criteria.where("userName").is(userName).and("roles").nin(role))
                .apply(new Update().push("roles").value(role))
                .first();
    }

    public CustomerResponse getCustomer(String userName) {
        Customer customer = customerRepository
                .findByUserName(userName)
                .orElseThrow(() -> new AppException(ErrorCode.CUSTOMER_NOT_FOUND));
        log.info("UserName:{}", customer.getUserName());
        return customerMapper.toCustomerResponse(customer);
    }

    public CustomerResponse getInfo() {
        var context = SecurityContextHolder.getContext();
        String name = context.getAuthentication().getName();
        log.info(name);
        Customer customer = customerRepository
                .findByUserName(name)
                .orElseThrow(() -> new AppException(ErrorCode.CUSTOMER_NOT_FOUND));
        return customerMapper.toCustomerResponse(customer);
    }
}
