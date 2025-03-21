
package com.wipro.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.wipro.dao.ProductRepository;
import com.wipro.model.Product;
import com.wipro.exception.ProductNotFoundException; // ✅ Custom exception
import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public Product createProduct(Product product) {
        try {
            return productRepository.save(product);
        } catch (Exception e) {
            throw new RuntimeException("Error while saving the product: " + e.getMessage());
        }
    }

    public List<Product> createProducts(List<Product> products) {
        try {
            return productRepository.saveAll(products);
        } catch (Exception e) {
            throw new RuntimeException("Error while saving multiple products: " + e.getMessage());
        }
    }

    public List<Product> getAllProducts() {
        try {
            return productRepository.findAll();
        } catch (Exception e) {
            throw new RuntimeException("Error while fetching products: " + e.getMessage());
        }
    }

    public Product findById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Product with ID " + id + " not found"));
    }

    public Product updateProduct(Long id, Product newProduct) {
        Product oldProduct = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Product with id " + id + " not found"));

        try {
            oldProduct.setName(newProduct.getName());
            oldProduct.setDescription(newProduct.getDescription());
            oldProduct.setManufacturer(newProduct.getManufacturer());
            oldProduct.setPrice(newProduct.getPrice());
            oldProduct.setQuantity(newProduct.getQuantity());

            return productRepository.save(oldProduct);
        } catch (Exception e) {
            throw new RuntimeException("Error while updating the product: " + e.getMessage());
        }
    }

    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Product with id " + id + " not found"));

        try {
            productRepository.delete(product);
        } catch (Exception e) {
            throw new RuntimeException("Error while deleting the product: " + e.getMessage());
        }
    }
}

