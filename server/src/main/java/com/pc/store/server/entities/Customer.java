package com.pc.store.server.entities;

import java.util.Set;

import jakarta.validation.constraints.NotNull;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Document(collection = "customers")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Getter
@Setter
public class Customer {
    @Id
    @JsonSerialize(using = ToStringSerializer.class)
    ObjectId id;

    @Indexed(unique = true)
    @NotNull(message = "Username is required")
    String userName;

    String firstName;
    String lastName;
    String email;
    String phoneNumber;
    String password;

    @DocumentReference
    Set<Role> roles;
}
