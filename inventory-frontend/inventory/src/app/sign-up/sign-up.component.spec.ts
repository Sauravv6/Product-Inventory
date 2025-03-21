import { TestBed } from '@angular/core/testing';
import { SignUpComponent } from './sign-up.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: any;
  let router: Router;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SignUpComponent, RouterTestingModule, HttpClientTestingModule, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty user details', () => {
    expect(component.user.email).toBe('');
    expect(component.user.password).toBe('');
    expect(component.user.firstName).toBe('');
    expect(component.user.lastName).toBe('');
    expect(component.user.location).toBe('');
    expect(component.user.number).toBe('');
  });

  it('should make an API call on register and navigate to login on success', () => {
    spyOn(router, 'navigate');
    component.user = {
      email: 'test@example.com',
      password: 'password123',
      firstName: 'John',
      lastName: 'Doe',
      location: 'New York',
      number: '1234567890'
    };

    component.register();

    const req = httpMock.expectOne('http://localhost:9090/users/register');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(component.user);

    req.flush({ success: true });

    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should handle registration failure', () => {
    spyOn(console, 'error'); // Mock console.error

    component.register();

    const req = httpMock.expectOne('http://localhost:9090/users/register');
    req.error(new ErrorEvent('Network error'));

    expect(console.error).toHaveBeenCalledWith('Registration failed', jasmine.anything());
  });

  afterEach(() => {
    httpMock.verify();
  });
});
