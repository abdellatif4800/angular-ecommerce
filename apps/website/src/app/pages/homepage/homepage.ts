import { Component, inject, signal, OnInit } from '@angular/core';
import { AdsCarousel } from '../../components/homepage/adsCarousel/adsCarousel';
import { CategoriesList } from '../../components/homepage/categoriesList/categoriesList';
import { ProductCard } from '../../components/products/productCard/productCard';
import { TopratedProducts } from '../../components/homepage/toprated-products/toprated-products';
import { ProductsServices } from '@ecommerce-angular/services';
import { ProductsCarousel } from '../../components/products/products-carousel/products-carousel';

@Component({
  selector: 'app-page-homepage',
  imports: [AdsCarousel, CategoriesList, TopratedProducts, ProductsCarousel],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css',
})
export class Homepage implements OnInit {
  private productService = inject(ProductsServices);

  brandsLogo = [
    'brands/adidas.svg',
    'brands/nike.svg',
    'brands/dell.svg',
    'brands/hp.svg',
    'brands/apple.svg',
    'brands/samsung.svg',
  ];

  product = signal<{
    name: string;
    category: string;
    price: number;
    discount: number;
    rate: number;
    imageUrl: string;
  }>({
    name: 'Product 4',
    category: 'Elec',
    price: 400,
    discount: 0,
    rate: 4,
    imageUrl: 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp',
  });

  topRatedproducts = signal<any[]>([]);

  highDiscountProducts = signal<any[]>([]);

  ngOnInit(): void {
    this.productService.getListOfProducts(`?rate=5`).subscribe({
      next: (res) => {
        this.topRatedproducts.set(
          res.results.map((prod: any) => ({
            id: prod.id,
            category: prod.category,
            name: prod.name,
            price: prod.price,
            discount: prod.discount,
            rate: prod.rate,
            image: prod.images[0].photo.replace('ecom-minio-storage', 'localhost'),
            stock: prod.stock,
          })),
        );
      },
    });

    this.productService.getListOfProducts(`?discount__gte=50`).subscribe({
      next: (res) => {
        this.highDiscountProducts.set(
          res.results.map((prod: any) => ({
            id: prod.id,
            category: prod.category,
            name: prod.name,
            price: prod.price,
            discount: prod.discount,
            rate: prod.rate,
            image: prod.images[0].photo.replace('ecom-minio-storage', 'localhost'),
            stock: prod.stock,
          })),
        );
      },
    });
  }
}
