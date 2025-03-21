package com.wipro.dao;


import org.springframework.data.jpa.repository.JpaRepository;

import com.wipro.model.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
