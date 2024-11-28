package com.pc.store.server.dto.response;

import java.util.List;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UpdateProductDetailResponse {
    List<String> images;
    String processor;
    String ram;
    String storage;
    String graphicsCard;
    String powerSupply;
    String motherboard;
    String case_;
    String coolingSystem;
    String operatingSystem;
}
