import { Route } from '@angular/router';
import { Homepage } from './pages/homepage/homepage';
import { Products } from './pages/products/products';
import { Auth } from './pages/auth/auth';
import { Layout } from './layout/layout/layout';
import { adminAuthGuard } from '@ecommerce-angular/services';
import { Orders } from './pages/orders/orders';
import { Users } from './pages/users/users';

export const appRoutes: Route[] = [
  {
    path: '',
    component: Layout,
    // canActivate: [adminAuthGuard],
    children: [
      { path: '', component: Homepage },
      { path: 'products', component: Products },
      { path: 'orders', component: Orders },
      { path: 'users', component: Users },
    ],
  },
  { path: 'auth', component: Auth },
];
