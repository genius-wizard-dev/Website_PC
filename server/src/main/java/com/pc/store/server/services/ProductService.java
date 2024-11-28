package com.pc.store.server.services;

import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.pc.store.server.dao.ProductRepository;
import com.pc.store.server.dto.response.ProductResponse;
import com.pc.store.server.entities.Product;
import com.pc.store.server.exception.AppException;
import com.pc.store.server.exception.ErrorCode;
import com.pc.store.server.mapper.ProductMapper;

import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Service
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class ProductService {

    ProductRepository productRepository;
    ProductMapper productMapper;

    public Page<Product> getProductsByPage(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productRepository.findAllBy(pageable);
    }

    public Page<Product> getProductsByPageAsc(int page, int size) {
        Pageable pageable =
                PageRequest.of(page, size, Sort.by("priceAfterDiscount").ascending());
        return productRepository.findAllBy(pageable);
    }

    public Page<Product> getProductsByPageDesc(int page, int size) {
        Pageable pageable =
                PageRequest.of(page, size, Sort.by("priceAfterDiscount").descending());
        return productRepository.findAllBy(pageable);
    }

    public Page<Product> getProductByName(String name, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productRepository.findByNameContaining(name, pageable);
    }

    public ProductResponse getProductById(String id) {
        Product product = productRepository
                .findById(new ObjectId(id))
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
        return productMapper.toProductResponse(product);
    }

    public boolean updateInStockProduct(ObjectId productId, int quantity) {
        Product product =
                productRepository.findById(productId).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
        product.setInStock(product.getInStock() - quantity);
        productRepository.save(product);
        return true;
    }
}
