import { TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: any;
  let router: Router;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LoginComponent, RouterTestingModule, HttpClientTestingModule, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty credentials', () => {
    expect(component.credentials.email).toBe('');
    expect(component.credentials.password).toBe('');
  });

  it('should make an API call on login and navigate to home if credentials are valid', () => {
    spyOn(router, 'navigate');
    spyOn(window, 'alert'); // Mock alert

    component.credentials = { email: 'test@example.com', password: 'password123' };
    component.login();

    const req = httpMock.expectOne('http://localhost:9090/users');
    expect(req.request.method).toBe('GET');

    req.flush([{ email: 'test@example.com', password: 'password123', name: 'Test User' }]);

    expect(localStorage.getItem('loggedInUser')).toContain('Test User');
    expect(router.navigate).toHaveBeenCalledWith(['/']);
    expect(window.alert).toHaveBeenCalledWith('Login Successful! Redirecting...');
  });

  it('should show an alert if login credentials are incorrect', () => {
    spyOn(window, 'alert');

    component.credentials = { email: 'wrong@example.com', password: 'wrongpass' };
    component.login();

    const req = httpMock.expectOne('http://localhost:9090/users');
    req.flush([{ email: 'test@example.com', password: 'password123' }]); // No matching user

    expect(window.alert).toHaveBeenCalledWith('Invalid email or password. Please try again!');
  });

  it('should show an alert if API call fails', () => {
    spyOn(window, 'alert');
    component.login();

    const req = httpMock.expectOne('http://localhost:9090/users');
    req.error(new ErrorEvent('Network error'));

    expect(window.alert).toHaveBeenCalledWith('Error logging in. Please try again later.');
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });
});
