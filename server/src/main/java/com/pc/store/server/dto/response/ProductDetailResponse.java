package com.pc.store.server.dto.response;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProductDetailResponse {
    @JsonSerialize(using = ToStringSerializer.class)
    ObjectId id;
    List<String> images;
    String productId;
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
