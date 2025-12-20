import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopratedProducts } from './toprated-products';

describe('TopratedProducts', () => {
  let component: TopratedProducts;
  let fixture: ComponentFixture<TopratedProducts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopratedProducts],
    }).compileComponents();

    fixture = TestBed.createComponent(TopratedProducts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
