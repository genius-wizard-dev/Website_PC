package com.pc.store.server.dao;

import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.pc.store.server.entities.Product;

@Repository
public interface ProductRepository extends MongoRepository<Product, ObjectId> {
    Page<Product> findAllBy(Pageable pageable);

    Page<Product> findByNameContaining(String name, Pageable pageable);
}
