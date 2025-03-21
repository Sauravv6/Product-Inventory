import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-sign-up',
  imports: [FormsModule, RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  user = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    location: '',
    number: ''
  };
  constructor(private http: HttpClient, private router: Router) {}

  register() {
    this.http.post('http://localhost:9090/users/register', this.user).subscribe({
      next: (response) => {
        console.log('User registered:', response);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Registration failed', error);
      },
      complete: () => {
        console.log('Registration request completed');
      }
    });
  }
}