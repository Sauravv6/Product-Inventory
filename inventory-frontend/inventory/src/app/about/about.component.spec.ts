import { TestBed } from '@angular/core/testing';
import { AboutComponent } from './about.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('AboutComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AboutComponent, RouterTestingModule],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(AboutComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should have a "View Products" button with routerLink to "/products"', () => {
    const fixture = TestBed.createComponent(AboutComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const button = compiled.querySelector('a[routerLink="/products"]');

    expect(button).toBeTruthy(); 
    expect(button.textContent).toContain('View Products');
  });
});
