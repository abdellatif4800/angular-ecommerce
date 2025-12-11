import { Component, computed, inject, input, model, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgStyle, UpperCasePipe } from '@angular/common';
import { ProductsServices } from '@ecommerce-angular/services';
import { toSignal } from '@angular/core/rxjs-interop';
import { RelatedProducts } from '../../components/products/related-products/related-products';
import { ProductCard } from '../../components/products/productCard/productCard';
import { CartServices } from '@ecommerce-angular/services';
import {
  LucideAngularModule,
  ShoppingCart,
  Heart,
  ArrowBigRight,
  ArrowBigLeft,
  Home,
} from 'lucide-angular';
import { ProductsCarousel } from '../../components/products/products-carousel/products-carousel';

@Component({
  selector: 'app-page-product-detail',
  imports: [
    UpperCasePipe,
    RouterLink,
    ProductsCarousel,
    LucideAngularModule,
    ProductCard,
    RelatedProducts,
    FormsModule,
    NgStyle,
  ],
  templateUrl: './productDetail.html',
  styleUrl: './productDetail.css',
})
export class ProductDetail implements OnInit {
  private readonly activeRoute = inject(ActivatedRoute);
  private data: any = toSignal(this.activeRoute.data);
  private productService = inject(ProductsServices);
  private cartService = inject(CartServices);

  readonly CartIcon = ShoppingCart;
  readonly HeartIcon = Heart;
  readonly lArrowIcon = ArrowBigLeft;
  readonly rArrowIcon = ArrowBigRight;
  readonly HomeIcon = Home;

  ngOnInit() {
    this.activeRoute.queryParams.subscribe({
      next: (res: any) => {
        this.currentCategory.set(res.category);
      },
    });

    console.log("data", this.data().product);

    // this.productService.getListOfProducts(`?search=${this.currentCategory()}`).subscribe({
    //   next: (res) => {
    //     this.relatedProducts.set(
    //       res.results.map((prod: any) => ({
    //         id: prod.id,
    //         category: prod.category,
    //         name: prod.name,
    //         price: prod.price,
    //         discount: prod.discount,
    //         rate: prod.rate,
    //         image: prod.images[0].photo.replace('ecom-minio-storage', 'localhost'),
    //         stock: prod.stock,
    //       })),
    //     );
    //   },
    // });
  }



  currentID = signal<number>(0);
  currentCategory = signal('');

  product = computed(() => {
    const product = this.data()?.['product'];
    if (!product) return null;

    return {
      id: product._id,
      name: product.productName,
      price: product.price,
      discount: product.discount,
      rate: product.rate,
      imageUrl: product.imageUrl,
      category: product.category,
    };
  });

  relatedProducts = signal<any>({});

  images = computed(() => {
    const product = this.data()?.['product'];
    if (!product) return [];

    return product.images.map((img: any) => ({
      image: img.photo.replace('ecom-minio-storage', 'localhost'),
      title: img.name,
    }));
  });

  currentMainImageIdx = signal<number>(0);

  isDiscreptionShown = signal<boolean>(false);

  sizeValue!: number;

  sizesOptions: any[] = [
    { name: 'sm', value: 1 },
    { name: 'md', value: 1 },
    { name: 'lg', value: 1 },
    { name: 'xl', value: 1 },
  ];

  colorValue!: number;

  colorsOptions: any[] = [
    { name: 'Red', value: 1 },
    { name: 'Blue', value: 1 },
    { name: 'Green', value: 1 },
    { name: 'Yellow', value: 1 },
  ];

  discreptionReadMore = () => ({
    overflow: 'hidden',
    display: this.isDiscreptionShown() ? 'block' : '-webkit-box',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': '2',
  });

  priceAfterDiscount = (price: number, discount: number) => {
    return price - (price * discount) / 100;
  };
  addItemToCart() {
    // this.cartService.addItemToCart(this.product()!.id).subscribe({
    //   next: (res) => {
    //     // this.messageService.add({
    //     //   severity: 'info',
    //     //   summary: 'Info',
    //     //   detail: 'ITEM ADDED',
    //     //   life: 3000,
    //     // });
    //   },
    //   error: (err) => {
    //     console.error(err.error);
    //
    //     if (err.error === 'product out of stock') {
    //       // this.messageService.add({
    //       //   severity: 'danger',
    //       //   summary: 'Info',
    //       //   detail: 'OUT OF STOCK',
    //       //   life: 3000,
    //       // });
    //     }
    //
    //     if (err.error === 'product exist in cart') {
    //       // this.messageService.add({
    //       //   severity: 'warn',
    //       //   summary: 'Info',
    //       //   detail: 'EXIST IN CART',
    //       //   life: 3000,
    //       // });
    //     }
    //     // if (err.error === 'Cart is empty') {
    //     //   this.messageShown.set(true);
    //     //   this.message.set('Item Added');
    //     //   setTimeout(() => this.messageShown.set(false), 1000);
    //     // }
    //   },
    // });
  }
}
