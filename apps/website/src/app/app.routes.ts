import { Route } from '@angular/router';
import { userAuthGuard } from '@ecommerce-angular/services';
import { CartAndOrderlist } from './pages/cart-and-orderlist/cart-and-orderlist';
import { Categories } from './pages/categories/categories';
import { Homepage } from './pages/homepage/homepage';
import { ProductDetail } from './pages/productDetail/productDetail';
import { ProductsList } from './pages/productsList/productsList';
import { SearchProductsList } from './pages/search-products-list/search-products-list';
import { ProductsListResolver, SearchProductsListResolver, ProductResolver } from './resolvers/product/porduct-resolver';

export const appRoutes: Route[] = [
  { path: '', component: Homepage },

  { path: 'categories', component: Categories },

  {
    path: 'subcategory/:id',
    component: ProductsList,
    resolve: {
      productsList: ProductsListResolver,
    },
  },
  {
    path: 'searchList/:searchKeyword',
    component: SearchProductsList,
    resolve: {
      productsList: SearchProductsListResolver,
    },
  },
  {
    path: 'product/:id',
    component: ProductDetail,
    data: { id: 0, category: '', name: '' },
    resolve: {
      product: ProductResolver,
    },
  },

  {
    path: 'userLists/:listType',
    component: CartAndOrderlist,
    // canActivate: [userAuthGuard],
  },

  { path: '**', redirectTo: '' },

];
