package com.pc.store.server.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pc.store.server.dto.request.ApiResponse;
import com.pc.store.server.dto.response.ProductDetailResponse;
import com.pc.store.server.services.ProductDetailService;

import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@RestController
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/product-detail")
public class ProductDetailController {
    ProductDetailService pdService;

    @GetMapping("{id}")
    public ApiResponse<ProductDetailResponse> getProductDetail(@PathVariable String id) {

        var result = pdService.getProductDetail(id);
        return ApiResponse.<ProductDetailResponse>builder().result(result).build();
    }
}
