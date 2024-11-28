package com.pc.store.server.services;

import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import com.pc.store.server.dao.ProductDetailRepository;
import com.pc.store.server.dto.response.ProductDetailResponse;
import com.pc.store.server.entities.ProductDetail;
import com.pc.store.server.exception.AppException;
import com.pc.store.server.exception.ErrorCode;
import com.pc.store.server.mapper.ProductDetailMapper;

import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Service
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Slf4j
public class ProductDetailService {
    ProductDetailRepository pdRepository;
    ProductDetailMapper pdMapper;

    public ProductDetailResponse getProductDetail(String id) {
        ProductDetail pd = pdRepository
                .findByProductId(new ObjectId(id))
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_DETAIL_NOT_FOUND));
        log.info(pd.getPowerSupply());
        return pdMapper.toProductDetailResponse(pd);
    }
}
