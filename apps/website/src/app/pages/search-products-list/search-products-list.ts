import { Component, inject, signal, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { FilterSidebar } from '../../components/products/filterSidebar/filterSidebar';
import { ProductCard } from '../../components/products/productCard/productCard';
import { ProductsServices } from '@ecommerce-angular/services';
// import { PaginatorModule, PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-search-products-list',
  imports: [FilterSidebar, ProductCard],
  templateUrl: './search-products-list.html',
  styleUrl: './search-products-list.css',
})
export class SearchProductsList implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private data = toSignal(this.activatedRoute.data);
  private productService = inject(ProductsServices);
  products = signal<
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

  nextFilterdPage = signal<string>('');

  totalProducts = signal<number>(0);
  onPageChange(event: any) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 5;

    this.nextFilterdPage.set(
      `?search=${this.data()?.['productsList'].next}&page=${
        (event.page ?? 0) + 1
      }`
    );

    this.productService.getListOfProducts(this.nextFilterdPage()).subscribe({
      next: (res: any) => {
        console.log(res.results);

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
  first = 1;

  rows = 5;

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

  ngOnInit() {
    // console.log(this.data());
    this.activatedRoute.data.subscribe(({ productsList }) => {
      this.products.set(
        productsList.results.map((prod: any) => ({
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
      // console.log(this.products());
    });

    //   const productsList = this.data()?.['productsList'].results;
    //   this.totalProducts.set(this.data()?.['productsList'].count);
    //
    //   this.products.set(
    //     productsList.map((prod: any) => ({
    //       id: prod.id,
    //       category: prod.category,
    //       name: prod.name,
    //       price: prod.price,
    //       discount: prod.discount,
    //       rate: prod.rate,
    //       image: prod.images[0].photo.replace('ecom-minio-storage', 'localhost'),
    //       stock: prod.stock,
    //     })),
    //   );
  }
}
