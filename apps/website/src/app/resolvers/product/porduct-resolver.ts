import { ResolveFn } from '@angular/router';
import { ProductsServices } from '@ecommerce-angular/services';
import { inject } from '@angular/core';

export const ProductResolver: ResolveFn<any> = (route, state) => {
  const service = inject(ProductsServices);
  const id = route.queryParams['id'];
  console.log(id);

  return service.getProductById(id);
};

export const ProductsListResolver: ResolveFn<any> = (route, state) => {
  const service = inject(ProductsServices);
  const subcategoryId: string = route.paramMap.get('id') ?? '';

  const data: any = service.getListOfProducts(`?subcategoryId=${subcategoryId}`);

  return data
};
export const SearchProductsListResolver: ResolveFn<any> = (route, state) => {
  const service = inject(ProductsServices);
  const searchWord: string = route.paramMap.get('searchKeyword') ?? '';
  console.log(123);

  return service.getListOfProducts(`? search = ${searchWord} `);
  //return true;
};
