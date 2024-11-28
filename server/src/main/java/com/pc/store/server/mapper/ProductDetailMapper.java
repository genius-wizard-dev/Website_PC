package com.pc.store.server.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import com.pc.store.server.dto.response.ProductDetailResponse;
import com.pc.store.server.entities.Product;
import com.pc.store.server.entities.ProductDetail;

@Mapper(componentModel = "spring")
public interface ProductDetailMapper {
    @Mapping(source = "product", target = "productId", qualifiedByName = "productToProductId")
    ProductDetailResponse toProductDetailResponse(ProductDetail productDetail);

    @Named("productToProductId")
    default String productToProductId(Product product) {
        return product != null && product.getId() != null ? product.getId().toHexString() : null;
    }
}
