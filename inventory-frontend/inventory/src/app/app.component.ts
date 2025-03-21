import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'inventory';

  constructor(private router: Router) {}

  isLoggedIn() {
    return !!localStorage.getItem('loggedInUser'); 
  }

  getUserName(): string {
    const user = localStorage.getItem('loggedInUser');
    return user ? JSON.parse(user).name : '';
  }
  logout() {
    localStorage.removeItem('loggedInUser'); 
    this.router.navigate(['/login']); 
  }
}
