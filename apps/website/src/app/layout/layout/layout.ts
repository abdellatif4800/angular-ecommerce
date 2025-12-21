import {
  Component,
  DestroyRef,
  effect,
  inject,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { Navbar } from '../navbar/navbar';
import {
  ActivatedRoute,
  Event,
  Router,
  NavigationStart,
  NavigationEnd,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { Footer } from '../footer/footer';
import { LoginForm } from '../../components/login-form/login-form';
import { CategoriesList } from '../categoriesList/categoriesList';

@Component({
  selector: 'app-layout',
  imports: [
    CategoriesList,
    Footer,
    Navbar,
    LoginForm,
    RouterModule,
    RouterOutlet,
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout implements OnInit {
  private readonly router = inject(Router);
  private readonly activeRoute = inject(ActivatedRoute);

  currentTheme = signal('cmyk')

  currentPath = signal<string>('');

  currentCategory = signal<string>('');
  currentProduct = signal<string>('');
  currentSearchKeyword = signal<string>('');

  handelChangeTheme(theme: string) {
    this.currentTheme.set(theme)

  }


  ngOnInit() {
    const categoryName = this.activeRoute.snapshot;
    // console.log(categoryName);
  }
}
