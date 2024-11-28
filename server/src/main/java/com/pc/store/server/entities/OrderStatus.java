package com.pc.store.server.entities;

import lombok.Getter;

@Getter
public enum OrderStatus {
    DELIVERING("Đang giao hàng"),
    DELIVERED("Đã giao hàng"),
    CANCELLED("Đã hủy");
    private final String status;

    OrderStatus(String status) {
        this.status = status;
    }
}
