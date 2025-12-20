import { Component, inject, signal, OnInit } from '@angular/core';
import { AdsCarousel } from '../../components/homepage/adsCarousel/adsCarousel';
import { ProductCard } from '../../components/products/productCard/productCard';
import { TopratedProducts } from '../../components/homepage/toprated-products/toprated-products';
import { ProductsServices } from '@ecommerce-angular/services';
import { ProductsCarousel } from '../../components/products/products-carousel/products-carousel';

@Component({
  selector: 'app-page-homepage',
  imports: [AdsCarousel, TopratedProducts, ProductsCarousel],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css',
})
export class Homepage implements OnInit {
  private productService = inject(ProductsServices);

  brandsLogo = [
    'brands/adidas.svg',
    'brands/nike.svg',
    'brands/gap.svg',
    'brands/under-armour.svg',
    'brands/puma.svg',
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
    imageUrl:
      'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp',
  });

  topRatedproducts = signal<any[]>([]);

  highDiscountProducts = signal<any[]>([]);

  ngOnInit(): void {
    this.productService.getListOfProducts(`?rateMin=5`).subscribe({
      next: (res) => {
        this.topRatedproducts.set(
          res.map((prod: any) => ({
            _id: prod._id,
            productName: prod.productName,
            price: prod.price,
            discount: prod.discount,
            stock: prod.stock,
            rate: prod.rate,
            imageUrl: prod.imageUrl,
            subCategoryID: prod.subCategoryID,
            publish: prod.publish,
            creatdAt: prod.creatdAt,
            subCategoryName: prod.subCategoryName,
          }))
        );
      },
    });

    this.productService.getListOfProducts(`?discountMin=40`).subscribe({
      next: (res) => {
        this.highDiscountProducts.set(
          res.map((prod: any) => ({
            _id: prod._id,
            productName: prod.productName,
            price: prod.price,
            discount: prod.discount,
            stock: prod.stock,
            rate: prod.rate,
            imageUrl: prod.imageUrl,
            subCategoryID: prod.subCategoryID,
            publish: prod.publish,
            creatdAt: prod.creatdAt,
            subCategoryName: prod.subCategoryName,
          }))
        );
      },
    });
  }
}
