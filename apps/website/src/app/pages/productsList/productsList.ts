import { Component, inject, signal, OnInit, effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  LogOut,
  LucideAngularModule,
  ShoppingCart,
  Home,
} from 'lucide-angular';
import { FilterSidebar } from '../../components/products/filterSidebar/filterSidebar';
import { ProductCard } from '../../components/products/productCard/productCard';
import { ProductsServices } from '@ecommerce-angular/services';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-page-products-list',
  imports: [
    UpperCasePipe,
    RouterLink,
    FilterSidebar,
    ProductCard,
    LucideAngularModule,
  ],
  templateUrl: './productsList.html',
  styleUrl: './productsList.css',
})
export class ProductsList implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private data = toSignal(this.activatedRoute.data);
  private productService = inject(ProductsServices);

  readonly ShoppingCart = ShoppingCart;
  readonly HomeIcon = Home;

  ngOnInit() {
    this.products.set(this.data()?.['productsList']);

    this.activatedRoute.params.subscribe({
      next: (res: any) => {
        this.productService
          .getListOfProducts(`?subcategoryId=${res.id}`)
          .subscribe({
            next: (res: any) => {
              this.products.set(res);
            },
          });
      },
    });
  }

  nextFilterdPage = signal<string>('');

  totalProducts = signal<number>(0);

  currentCategory = this.activatedRoute.snapshot.queryParams['subCategoryName'];

  products = signal<
    {
      _id: string;
      productName: string;
      price: number;
      discount: number;
      rate: number;
      imageUrl: string;
      subCategoryID: string;
      stock: number;
      subCategoryName: string;
    }[]
  >([]);

  roundUpPages(value: number): number {
    return Math.round(value);
  }

  onPageChange(event: any) {
    this.nextFilterdPage.set(
      `?category=${this.currentCategory.toLocaleLowerCase()}&page=${
        (event.page ?? 0) + 1
      }`
    );

    this.productService.getListOfProducts(this.nextFilterdPage()).subscribe({
      next: (res: any) => {
        // console.log(res.results);

        const productsList = res.results;

        this.products.set(
          productsList.map((prod: any) => ({
            id: prod.id,
            category: prod.category,
            name: prod.name,
            price: prod.price,
            discount: prod.discount,
            rate: prod.rate,
            image: prod.images[0].photo.replace(
              'ecom-minio-storage',
              'localhost'
            ),
            stock: prod.stock,
          }))
        );
      },
    });
    // console.log((event.page ?? 0) + 1);
  }

  getFilteredData(filterdData: any) {
    this.nextFilterdPage.set(filterdData.next);
    this.totalProducts.set(filterdData.count);
    this.products.set(
      filterdData.data.map((prod: any) => ({
        id: prod.id,
        category: prod.category,
        name: prod.name,
        price: prod.price,
        discount: prod.discount,
        rate: prod.rate,
        image: prod.images[0].photo.replace('ecom-minio-storage', 'localhost'),
        stock: prod.stock,
      }))
    );
  }
}
