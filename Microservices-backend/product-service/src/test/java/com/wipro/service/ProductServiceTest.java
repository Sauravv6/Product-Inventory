package com.wipro.service;

import com.wipro.dao.ProductRepository;
import com.wipro.model.Product;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductService productService;

    private Product product;

    @BeforeEach
    void setUp() {
        product = new Product(1L, "Laptop", "Gaming Laptop", "Dell", 1200.0, 10);
    }

    @Test
    void testCreateProduct() {
        when(productRepository.save(product)).thenReturn(product);
        Product savedProduct = productService.createProduct(product);
        assertNotNull(savedProduct);
        assertEquals("Laptop", savedProduct.getName());
        verify(productRepository, times(1)).save(product);
    }

    @Test
    void testCreateProducts() {
        List<Product> products = Arrays.asList(product, new Product(2L, "Phone", "Smartphone", "Apple", 999.0, 5));
        when(productRepository.saveAll(products)).thenReturn(products);
        List<Product> savedProducts = productService.createProducts(products);
        assertEquals(2, savedProducts.size());
        verify(productRepository, times(1)).saveAll(products);
    }

    @Test
    void testGetAllProducts() {
        when(productRepository.findAll()).thenReturn(List.of(product));
        List<Product> products = productService.getAllProducts();
        assertFalse(products.isEmpty());
        assertEquals(1, products.size());
        verify(productRepository, times(1)).findAll();
    }

    @Test
    void testFindById_ProductExists() {
        when(productRepository.findById(1L)).thenReturn(Optional.of(product));
        Product foundProduct = productService.findById(1L);
        assertNotNull(foundProduct);
        assertEquals(1L, foundProduct.getId());
        verify(productRepository, times(1)).findById(1L);
    }

    @Test
    void testFindById_ProductNotFound() {
        when(productRepository.findById(99L)).thenReturn(Optional.empty());
        Exception exception = assertThrows(RuntimeException.class, () -> productService.findById(99L));
        assertEquals("Product with ID 99 not found", exception.getMessage());
        verify(productRepository, times(1)).findById(99L);
    }

    @Test
    void testUpdateProduct() {
        Product updatedProduct = new Product(1L, "Updated Laptop", "Updated Description", "HP", 1100.0, 15);
        when(productRepository.findById(1L)).thenReturn(Optional.of(product));
        when(productRepository.save(any(Product.class))).thenReturn(updatedProduct);

        Product result = productService.updateProduct(1L, updatedProduct);
        assertNotNull(result);
        assertEquals("Updated Laptop", result.getName());
        verify(productRepository, times(1)).findById(1L);
        verify(productRepository, times(1)).save(any(Product.class));
    }

    @Test
    void testDeleteProduct() {
        when(productRepository.findById(1L)).thenReturn(Optional.of(product));
        doNothing().when(productRepository).delete(product);
        productService.deleteProduct(1L);
        verify(productRepository, times(1)).delete(product);
    }
}
