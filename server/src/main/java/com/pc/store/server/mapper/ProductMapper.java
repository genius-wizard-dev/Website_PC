package com.pc.store.server.mapper;

import org.mapstruct.Mapper;

import com.pc.store.server.dto.request.CreationProductRequest;
import com.pc.store.server.dto.response.ProductResponse;
import com.pc.store.server.entities.Product;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    Product toProduct(CreationProductRequest response);

    ProductResponse toProductResponse(Product product);
}
