import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { ProductListComponent } from './product-list/product-list.component';
import { SignUpComponent } from './sign-up/sign-up.component';
export const routes: Routes = [

  { path: 'register', component: SignUpComponent},
  { path: 'login', component: LoginComponent },

  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  {path:'products', component:ProductListComponent},

];
