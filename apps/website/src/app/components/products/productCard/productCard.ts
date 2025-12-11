import { Component, input, signal, inject, OnInit } from '@angular/core';
import { LucideAngularModule, ShoppingCart, Heart } from 'lucide-angular';
import { NgStyle, NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartServices } from '@ecommerce-angular/services';

@Component({
  selector: 'app-comp-product-card',
  imports: [
    RouterLink,
    NgOptimizedImage,
    LucideAngularModule,
    NgStyle,
    FormsModule,
  ],
  templateUrl: './productCard.html',
  styleUrl: './productCard.css',
})
export class ProductCard implements OnInit {
  private cartService = inject(CartServices);

  readonly CartIcon = ShoppingCart;
  readonly HeartIcon = Heart;

  ngOnInit() {
    console.log(this.product())
  }

  product = input<{
    _id: string;
    productName: string;
    price: number;
    discount: number;
    rate: number;
    stock: number;
    imageUrl: string;
    subCategoryID: string;
  }>();

  stockStatus(stock: number): string {
    if (stock > 5) {
      return 'INSTOCK';
    } else if (stock > 0) {
      return 'LOWSTOCK';
    } else {
      return 'OUTOFSTOCK';
    }
  }

  getSeverity(stock: number): string {
    if (stock > 5) {
      return 'success';
    } else if (stock > 0) {
      return 'warn';
    } else {
      return 'danger';
    }
  }

  message = signal<any>('');
  messageShown = signal(false);
  messageColor = signal<string>('');

  addItemToCart() {
    this.cartService.addItemToCart(this.product()!._id).subscribe({
      next: (res) => {
        console.log(res);

      },
    });
  }

  rateValue = 2;

  readonly ShoppingCart = ShoppingCart;

  priceAfterDiscount = (price: number, discount: number) => {
    // return price - (price * discount) / 100;
    return Math.round((price - (price * discount) / 100) * 100) / 100;
  };

  get showRateBadge() {
    const p = this.product();
    return !!p && p.rate > 3.5;
  }

  isHoverd = signal(false);
  isCartBtnClicked = signal(false);

  cartBtnStyle = () => ({
    opacity: this.isHoverd() ? '0.7' : '0',
    transform: this.isCartBtnClicked() ? 'scale(.7)' : '',
  });

  clickCartBtnStyle() {
    this.isCartBtnClicked.set(true);
    setTimeout(() => {
      this.isCartBtnClicked.set(false);
    }, 200);
  }
}
