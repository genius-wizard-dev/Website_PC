package com.pc.store.server.dto.response;

import org.bson.types.ObjectId;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import com.pc.store.server.entities.Supplier;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductResponse {
    @JsonSerialize(using = ToStringSerializer.class)
    ObjectId id;

    String name;
    String img;
    double priceAfterDiscount;
    double originalPrice;
    double discountPercent;
    double priceDiscount;
    int inStock;
    boolean isUpdateDetail;
    Supplier supplier;
}
