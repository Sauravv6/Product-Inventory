import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AppComponent } from './app.component';
import { provideRouter } from '@angular/router';

describe('AppComponent', () => {
  let component: AppComponent;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter([])], 
    }).compileComponents();

    router = TestBed.inject(Router);
    component = TestBed.createComponent(AppComponent).componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have title as "inventory"', () => {
    expect(component.title).toBe('inventory');
  });

  it('should return false when user is not logged in', () => {
    localStorage.removeItem('loggedInUser');
    expect(component.isLoggedIn()).toBeFalse();
  });

  it('should return true when user is logged in', () => {
    localStorage.setItem('loggedInUser', JSON.stringify({ name: 'John' }));
    expect(component.isLoggedIn()).toBeTrue();
  });

  it('should return empty string when user is not logged in', () => {
    localStorage.removeItem('loggedInUser');
    expect(component.getUserName()).toBe('');
  });

  it('should return user name when user is logged in', () => {
    localStorage.setItem('loggedInUser', JSON.stringify({ name: 'John' }));
    expect(component.getUserName()).toBe('John');
  });

  it('should remove user from localStorage and navigate to login on logout', () => {
    localStorage.setItem('loggedInUser', JSON.stringify({ name: 'John' }));
    spyOn(router, 'navigate');

    component.logout();

    expect(localStorage.getItem('loggedInUser')).toBeNull();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
