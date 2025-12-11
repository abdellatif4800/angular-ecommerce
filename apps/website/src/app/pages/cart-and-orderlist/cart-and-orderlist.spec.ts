import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartAndOrderlist } from './cart-and-orderlist';

describe('CartAndOrderlist', () => {
  let component: CartAndOrderlist;
  let fixture: ComponentFixture<CartAndOrderlist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartAndOrderlist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartAndOrderlist);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
