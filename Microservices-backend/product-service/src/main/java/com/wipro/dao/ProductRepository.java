package com.wipro.dao;


import org.springframework.data.jpa.repository.JpaRepository;

import com.wipro.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
