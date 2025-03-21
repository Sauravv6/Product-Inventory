
package com.wipro.service;

import com.wipro.dao.UserRepository;
import com.wipro.model.User;
import com.wipro.service.UserService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest {

    @Mock
    private UserRepository userRepository;  // Mocking DB layer

    @InjectMocks
    private UserService userService;  // Service being tested

    private User sampleUser;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);  // Initialize mocks
        sampleUser = new User(1L, "test@example.com", "password123", "John", "Doe", "New York", "1234567890");
    }

    @Test
    void testRegisterUser() {
        when(userRepository.save(any(User.class))).thenReturn(sampleUser);

        User savedUser = userService.registerUser(sampleUser);

        assertNotNull(savedUser);
        assertEquals("test@example.com", savedUser.getEmail());
    }

    @Test
    void testFindByEmail_UserExists() {
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(sampleUser));

        User foundUser = userService.findByEmail("test@example.com");

        assertNotNull(foundUser);
        assertEquals("test@example.com", foundUser.getEmail());
    }

    @Test
    void testFindByEmail_UserNotFound() {
        when(userRepository.findByEmail("unknown@example.com")).thenReturn(Optional.empty());

        Exception exception = assertThrows(RuntimeException.class, () -> {
            userService.findByEmail("unknown@example.com");
        });

        assertTrue(exception.getMessage().contains("User with email unknown@example.com not found"));
    }
}
