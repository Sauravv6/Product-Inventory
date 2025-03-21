import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [FormsModule,CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {

  products: any[] = [];
  selectedProduct: any = null;
  isAddingNew: boolean = false; 
  isLoggedIn: boolean = false; 


  constructor(private http: HttpClient, private router: Router) {}


  ngOnInit() {
    this.getProducts();
    this.checkLoginStatus();

  }

  searchQuery: string = '';
filteredProducts: any[] = [];

filterProducts() {
  this.filteredProducts = this.products.filter(product =>
    product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
    product.manufacturer.toLowerCase().includes(this.searchQuery.toLowerCase())
  );
}

  
  checkLoginStatus() {
    this.isLoggedIn = !!localStorage.getItem('loggedInUser'); 
  }

  getProducts() {
    // this.http.get<any[]>('http://localhost:8080/products').subscribe(data => {
      this.http.get<any[]>('http://localhost:9090/products').subscribe(data => {

      this.products = data;
      this.filteredProducts = data; 

    });
  }


  deleteProduct(id: number) {
    if (!this.isLoggedIn) {
      alert("Please log in first!");
      this.router.navigate(['/login']);
      return;
    }
    if (confirm('Are you sure you want to delete this product?')) {
      this.http.delete(`http://localhost:9090/products/${id}`).subscribe(() => {
        this.getProducts();
      });
    }
  }

  editProduct(product: any) {
    if (!this.isLoggedIn) {
      alert("Please log in first!");
      this.router.navigate(['/login']);
      return;
    }
    this.isAddingNew = false;
    this.selectedProduct = { ...product };
  }


  addProduct() {
    if (!this.isLoggedIn) {
      alert("Please log in first!");
      this.router.navigate(['/login']);
      return;
    }
    this.isAddingNew = true;
    this.selectedProduct = {
      name: '',
      description: '',
      manufacturer: '',
      price: 0,
      quantity: 0
    };
  }

  closePanel() {
    this.selectedProduct = null;
    this.isAddingNew = false;
  }

  updateProduct() {
    // this.http.put(`http://localhost:8080/products/${this.selectedProduct.id}`, this.selectedProduct).subscribe(() => {
      this.http.put(`http://localhost:9090/products/${this.selectedProduct.id}`, this.selectedProduct).subscribe(() => {

      alert('Product updated successfully!');
      this.getProducts();
      this.closePanel();
    });
  }


  saveProduct() {
    // this.http.post('http://localhost:8080/products', this.selectedProduct).subscribe(() => {
      this.http.post('http://localhost:9090/products', this.selectedProduct).subscribe(() => {

      alert('Product added successfully!');
      this.getProducts();
      this.closePanel();
    });
  }
}




