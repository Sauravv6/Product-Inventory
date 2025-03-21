import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credentials = { email: '', password: '' };
  users: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.http.get<any[]>('http://localhost:9090/users').subscribe({
      next: (users) => {
        this.users = users;
        const user = this.users.find(
          (u) => u.email === this.credentials.email && u.password === this.credentials.password
        );


      if (user) {
        alert('Login Successful! Redirecting...');
        localStorage.setItem('loggedInUser', JSON.stringify(user)); 
        this.router.navigate(['/']); 
      } else {
        alert('Invalid email or password. Please try again!');
      }
    },
    error: (error) => {
      console.error('Error fetching users', error);
      alert('Error logging in. Please try again later.');
    }
    });
  }
}


