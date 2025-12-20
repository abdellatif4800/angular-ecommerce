import { NgStyle } from '@angular/common';
import { Component, inject, signal, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  RouterLink,
  Router,
  NavigationEnd,
} from '@angular/router';
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
import { filter, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-categories-list',
  imports: [UpperCasePipe, LucideAngularModule, NgStyle, RouterLink],
  templateUrl: './categoriesList.html',
  styleUrl: './categoriesList.css',
})
export class CategoriesList implements OnInit {
  private productService = inject(ProductsServices);
  private activeRoute = inject(ActivatedRoute);
  private router = inject(Router);

  readonly ArrowBigRightDash = ArrowBigRightDash;
  readonly chevronDown = ChevronDown;

  isShown = signal<boolean>(false)

  currentRoute = signal<string>('');

  subCategoryName = signal<string>('');
  subCategoryID = signal<string>('');

  showCategories = signal<boolean>(true);

  productName = signal<string>('');

  showCloseCategoriesBtn = signal<boolean>(false);



  ngOnInit() {
    this.productService.getCategories().subscribe({
      next: (data) => {
        this.categories.set(data);
        // console.log(this.categories());
      },
    });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute.set(event.url);

        this.subCategoryName.set(
          this.activeRoute.snapshot.queryParamMap.get('subCategoryName') || ''
        );

        this.subCategoryID.set(
          this.activeRoute.snapshot.queryParamMap.get('subCategoryID') || ''
        );

        this.productName.set(
          this.activeRoute.snapshot.queryParamMap.get('productName') || ''
        );

        if (event.url === '/') {
          this.isShown.set(true)
          this.showCategories.set(true);
          this.showCloseCategoriesBtn.set(false);
        }

        if (
          event.url.includes('subcategory') ||
          event.url.includes('product')
        ) {
          this.isShown.set(true)

          this.showCategories.set(false);
        }

        if (
          event.url.includes('userLists')
        ) {
          this.isShown.set(false)

        }



      });

    this.subCategoryName.set(
      this.activeRoute.snapshot.queryParamMap.get('subCategoryName') || ''
    );
    this.subCategoryID.set(
      this.activeRoute.snapshot.queryParamMap.get('subCategoryID') || ''
    );

    this.productName.set(
      this.activeRoute.snapshot.queryParamMap.get('productName') || ''
    );

    this.currentRoute.set(this.router.url);

    if (
      this.currentRoute().includes('subcategory') ||
      this.currentRoute().includes('product')
    ) {
      this.isShown.set(true)

      this.showCategories.set(false);
    }
    if (this.currentRoute() === '/') {
      this.isShown.set(true)

      this.showCategories.set(true);
      this.showCloseCategoriesBtn.set(false);
    }
    if (
      this.currentRoute().includes('userLists')
    ) {
      this.isShown.set(false)

    }

    console.log(this.currentRoute() === '/');
  }

  isSubCategory() {
    return this.currentRoute().includes('subcategory');
  }

  isProduct() {
    return this.currentRoute().includes('product');
  }

  categories = signal<any>([]);

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
