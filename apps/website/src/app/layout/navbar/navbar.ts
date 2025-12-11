import { Component, signal, input, inject, OnInit } from '@angular/core';
import { NavbarCheckScroll } from '../../directives/navbarCheckScroll/navbarCheckScroll';
import { Router, RouterLink } from '@angular/router';
import { AuthSerivce } from '@ecommerce-angular/services';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsServices } from '@ecommerce-angular/services';
import { NgStyle } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { LucideAngularModule, ShoppingCart, List, LogOut, Search, User } from 'lucide-angular';
import { LoginForm } from '../../components/login-form/login-form';

@Component({
  selector: 'navbar',
  imports: [
    LoginForm,
    LucideAngularModule,
    NavbarCheckScroll,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    NgStyle,
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  private authService = inject(AuthSerivce);
  private authSubscription!: Subscription;
  private productService = inject(ProductsServices);
  private router = inject(Router);
  private activeRoute: any = inject(ActivatedRoute);

  readonly CartIcon = ShoppingCart;
  readonly ListIcon = List;
  readonly LogoutIcon = LogOut;
  readonly SearchIcon = Search;
  readonly UserIcon = User;

  username = this.authService.userData?.username;

  isUserLogedin = this.authService.isUserLogedin;

  // showAuthDialog = signal<boolean>(false);

  value: any;
  showDialog() {
    this.authService.openLoginForm();
  }

  searchControl = new FormControl();

  searchResultesShown = signal(true);
  searchButtonDisabled = signal(true);

  searchResultes = signal<any[]>([]);

  // searchResElement = () => ({
  //   display: this.searchResultesShown() ? 'block' : 'none',
  // });
  searchButton = () => ({
    display: this.searchButtonDisabled() ? 'block' : 'none',
  });

  logout() {
    this.authService.deleteToken();
  }
  goToSearchListPage() {
    //
    // if (this.router.url === '/searchList/') {
    //   this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.router.navigate(['/searchList', this.searchControl.value]);
    // } else {
    //   this.router.navigate(['']);
    // }
    // // this.router.navigate(['/searchList', this.searchControl.value]);
  }

  ngOnInit() {
    // console.log(this.authService.userData ?? '');

    this.searchControl.valueChanges.subscribe({
      next: (res) => {
        if (res.length >= 3) {
          this.searchButtonDisabled.set(false);
        } else {
          this.searchButtonDisabled.set(true);
        }
      },
    });
    //   .pipe(debounceTime(400), distinctUntilChanged())
    //   .subscribe((value) => {
    //     // if (value.length >= 3) {
    //     console.log();
    //
    //     this.searchResultesShown.set(true);
    //     this.productService.getListOfProducts(`?search=${value}`).subscribe((res) => {
    //       this.searchResultes.set(res.results.map((p: any) => p));
    //       console.log(this.searchResultes());
    //     });
    // }

    // if (value.length < 3) {
    //   this.searchResultesShown.set(false);
    // }
    // console.log(value);
    // });
  }
}
