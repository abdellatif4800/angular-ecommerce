import {
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
  OnInit,
} from '@angular/core';
import { ProductsServices } from '@ecommerce-angular/services';
import { ProductCard } from '../../products/productCard/productCard';
import { NgStyle } from '@angular/common';
import {
  LucideAngularModule,
  ArrowBigRight,
  ArrowBigLeft,
} from 'lucide-angular';

@Component({
  selector: 'app-products-carousel',
  imports: [LucideAngularModule, NgStyle, ProductCard],
  templateUrl: './products-carousel.html',
  styleUrl: './products-carousel.css',
})
export class ProductsCarousel implements OnInit {
  // CONFIG: How many items are visible per "slide" on desktop?
  readonly ITEMS_PER_SLIDE = 6;

  private productService = inject(ProductsServices);

  readonly lArrowIcon = ArrowBigLeft;
  readonly rArrowIcon = ArrowBigRight;

  products = input<any[]>([]);
  listTitel = input<string>('');

  // Track which "Page" or "Slide" we are on (0, 1, 2...)
  currentSlide = signal<number>(0);

  // Calculate total pages based on total items
  // e.g., 20 items / 6 per page = 4 pages (0, 1, 2, 3)
  maxSlide = computed(() =>
    Math.ceil((this.products()?.length || 0) / this.ITEMS_PER_SLIDE) - 1
  );

  // CSS Transform Calculation:
  // Slide 0: translateX(0%)
  // Slide 1: translateX(-100%) -> Moves one full screen width
  transformStyle = computed(() =>
    `translateX(-${this.currentSlide() * 100}%)`
  );

  constructor() { }

  nextBtn() {
    if (this.currentSlide() < this.maxSlide()) {
      this.currentSlide.update((v) => v + 1);
    }
  }

  prevBtn() {
    if (this.currentSlide() > 0) {
      this.currentSlide.update((v) => v - 1);
    }
  }

  ngOnInit() {
    // console.log('Carousel loaded with all items');
  }
}

// import {
//   Component,
//   computed,
//   effect,
//   inject,
//   input,
//   signal, OnInit,
// } from '@angular/core';
// import { ProductsServices } from '@ecommerce-angular/services';
// import { ProductCard } from '../../products/productCard/productCard';
// import { NgStyle } from '@angular/common';
// import {
//   LucideAngularModule,
//   ArrowBigRight,
//   ArrowBigLeft,
// } from 'lucide-angular';
//
// @Component({
//   selector: 'app-products-carousel',
//   imports: [LucideAngularModule, NgStyle, ProductCard],
//   templateUrl: './products-carousel.html',
//   styleUrl: './products-carousel.css',
// })
// export class ProductsCarousel implements OnInit {
//   private productService = inject(ProductsServices);
//
//   readonly lArrowIcon = ArrowBigLeft;
//   readonly rArrowIcon = ArrowBigRight;
//
//   products = input<
//     {
//       _id: string;
//       productName: string;
//       price: number;
//       discount: number;
//       rate: number;
//       stock: number;
//       imageUrl: string;
//       subCategoryID: string;
//       subCategoryName: string;
//     }[]
//   >([]);
//
//   listTitel = input<string>('');
//
//   cardOpacity = signal<number>(1);
//
//   listLength = signal<number>(this.products().length);
//   firstItem = signal<number>(0);
//   lastItem = signal<number>(6);
//
//   visibleProducts = computed(() =>
//     (this.products() || []).slice(this.firstItem(), this.lastItem())
//   );
//
//   constructor() {
//     effect(() => {
//       if (this.products().length) {
//         this.listLength.set(this.products().length);
//       }
//     });
//   }
//
//   nextBtn() {
//     if (this.lastItem() >= this.listLength()) {
//       return;
//     } else {
//       this.cardOpacity.set(0);
//       setTimeout(() => {
//         this.firstItem.update((x) => x + 5);
//         this.lastItem.update((x) => x + 5);
//         this.cardOpacity.set(1);
//       }, 1000);
//     }
//
//
//   }
//
//   prevBtn() {
//     if (this.firstItem() === 0) {
//       return;
//     } else {
//       this.cardOpacity.set(0);
//       setTimeout(() => {
//         this.firstItem.update((x) => x - 5);
//         this.lastItem.update((x) => x - 5);
//         this.cardOpacity.set(1);
//       }, 1000);
//     }
//   }
//   ngOnInit() {
//     console.log(this.products());
//     console.log(this.listLength());
//   }
// }
