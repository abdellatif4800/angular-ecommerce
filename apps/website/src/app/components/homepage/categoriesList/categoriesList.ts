import { NgStyle } from '@angular/common';
import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  LucideAngularModule,
  ChevronDown,
  Tv,
  Shirt,
  Home,
  Volleyball,
  ArrowBigRightDash,
  Book,
} from 'lucide-angular';
import { UpperCasePipe } from '@angular/common'; // Import UpperCasePipe
import { ProductsServices } from '@ecommerce-angular/services';

@Component({
  selector: 'app-categories-list',
  imports: [UpperCasePipe, LucideAngularModule, NgStyle, RouterLink],
  templateUrl: './categoriesList.html',
  styleUrl: './categoriesList.css',
})
export class CategoriesList implements OnInit {
  private productService = inject(ProductsServices)
  readonly ArrowBigRightDash = ArrowBigRightDash;
  readonly chevronDown = ChevronDown;

  ngOnInit() {
    this.productService.getCategories().subscribe({
      next: (data) => {
        this.categories.set(data)
        console.log(this.categories())
      }
    })
  }

  categories = signal<any>([])


  isHoverd = signal(false);

  specialBtnIconStyle = () => ({
    translate: this.isHoverd() ? '10px' : '0px',
  });

  btnStyle = () => ({
    width: '100%',
  });

  // categories = [
  //   { icon: Tv, name: 'electronics' },
  //   { icon: Shirt, name: 'fashion' },
  //   { icon: Book, name: 'books' },
  //   { icon: Home, name: 'Home' },
  // ];
}


// @for (cat of categories(); track $index; let idx = $index) {
//   <button [routerLink]="['/category', cat.name]" class="btn btn-info flex-1 w-full">
//     <span class="text-sm font-medium">{{ cat.name | uppercase }}</span>
//     <lucide-angular [img]="cat.icon" class="my-icon"></lucide-angular>
//   </button>
// }
//
// <div class="w-full">
//   <button
//     routerLink="/categories"
//     (mouseenter)="isHoverd.set(true)"
//     (mouseleave)="isHoverd.set(false)"
//     class="btn btn-secondary font-bold w-full"
//   >
//     <p>All Categories</p>
//     <lucide-angular
//       [ngStyle]="specialBtnIconStyle()"
//       class="transition-all duration-500"
//       [img]="ArrowBigRightDash"
//     ></lucide-angular>
//   </button>
// </div>

