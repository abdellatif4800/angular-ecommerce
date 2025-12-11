import { Component, DestroyRef, effect, inject, OnInit, signal, viewChild } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import {
  ActivatedRoute,
  Event,
  Router,
  NavigationStart,
  NavigationEnd,
  RouterModule,
} from '@angular/router';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { Footer } from '../footer/footer';
import { LoginForm } from '../../components/login-form/login-form';

@Component({
  selector: 'layout',
  imports: [Footer, Navbar, LoginForm, RouterModule],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout implements OnInit {
  private readonly router = inject(Router);
  private readonly activeRoute = inject(ActivatedRoute);

  currentPath = signal<string>('');

  currentCategory = signal<string>('');
  currentProduct = signal<string>('');
  currentSearchKeyword = signal<string>('');

  ngOnInit() {
    let categoryName = this.activeRoute.snapshot;
    // console.log(categoryName);
  }

  // constructor() {
  //   effect(() => {
  //     this.activeRoute.queryParams.subscribe((params) => {
  //       this.currentCategory.set(params['category']);
  //       this.currentProduct.set(params['name']);
  //       this.currentSearchKeyword.set(params['searchKeyword']);
  //     });
  //     console.log(this.activeRoute);
  //     // console.log('category', this.currentCategory());
  //
  //     //   if (this.currentPath() === '/') {
  //     //     this.pages = [];
  //     //   }
  //     //   if (this.currentPath().split('/')[1] === 'cart_and_orderlist') {
  //     //     this.pages = [];
  //     //   }
  //     //   if (this.currentPath() === '/categories') {
  //     //     this.pages = [{ label: 'Categories' }];
  //     //   }
  //     //
  //     //   if (this.currentPath().split('/')[1] === 'category') {
  //     //     this.pages = [
  //     //       { label: 'Categories', routerLink: '/categories' },
  //     //       { label: this.currentPath().split('/')[2].replace(/%20/g, ' ') },
  //     //     ];
  //     //   }
  //     //   if (this.currentPath().split('/')[1] === 'product') {
  //     //     this.pages = [
  //     //       { label: 'Categories', routerLink: '/categories' },
  //     //       {
  //     //         label: this.currentCategory(),
  //     //         routerLink: `/category/${this.currentCategory()}`,
  //     //       },
  //     //       // { label: this.currentPath().split('/')[2].replace(/%20/g, ' ') },
  //     //       { label: this.currentProduct() },
  //     //     ];
  //     //   }
  //     //
  //     //   if (this.currentPath().split('/')[1] === 'searchList') {
  //     //     this.pages = [
  //     //       { label: 'Search List' },
  //     //       {
  //     //         label: this.currentSearchKeyword(),
  //     //       },
  //     //     ];
  //     //   }
  //   });
  //   //
  //   this.router.events.pipe(takeUntilDestroyed()).subscribe((event: Event) => {
  //     if (event instanceof NavigationEnd) {
  //       this.currentPath.set(event.url);
  //     }
  //   });
  // }
  //
}
