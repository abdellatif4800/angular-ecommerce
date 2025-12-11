import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { ProductsServices } from '@ecommerce-angular/services'
import { ProductCard } from '../../products/productCard/productCard';
import { NgStyle } from '@angular/common';
import { LucideAngularModule, ArrowBigRight, ArrowBigLeft } from 'lucide-angular';

@Component({
  selector: 'products-carousel',
  imports: [LucideAngularModule, NgStyle, ProductCard,],
  templateUrl: './products-carousel.html',
  styleUrl: './products-carousel.css',
})
export class ProductsCarousel {
  private productService = inject(ProductsServices);

  readonly lArrowIcon = ArrowBigLeft;
  readonly rArrowIcon = ArrowBigRight;

  products = input<
    {
      id: number;
      name: string;
      price: number;
      discount: number;
      rate: number;
      image: string;
      category: string;
      stock: number;
    }[]
  >([]);

  listTitel = input<string>('');

  cardOpacity = signal<number>(1);

  listLength = signal<number>(this.products().length);
  firstItem = signal<number>(0);
  lastItem = signal<number>(5);

  visibleProducts = computed(() =>
    (this.products() || []).slice(this.firstItem(), this.lastItem()),
  );

  constructor() {
    effect(() => {
      if (this.products().length) {
        this.listLength.set(this.products().length);
      }
    });
  }

  nextBtn() {
    if (this.lastItem() >= this.listLength()) {
      return;
    } else {
      this.cardOpacity.set(0);
      setTimeout(() => {
        this.firstItem.update((x) => x + 5);
        this.lastItem.update((x) => x + 5);
        this.cardOpacity.set(1);
      }, 1000);
    }
  }

  prevBtn() {
    if (this.firstItem() === 0) {
      return;
    } else {
      this.cardOpacity.set(0);
      setTimeout(() => {
        this.firstItem.update((x) => x - 5);
        this.lastItem.update((x) => x - 5);
        this.cardOpacity.set(1);
      }, 1000);
    }
  }
  //
  // ngOnInit() {
  //   console.log(this.products());
  //   console.log(this.listLength());
  // }
}
