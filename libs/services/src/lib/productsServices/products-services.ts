import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '@ecommerce-angular/environments';

@Injectable({
  providedIn: 'root',
})
export class ProductsServices {
  private http = inject(HttpClient);


  refreshProducts = signal(0);

  createProduct(newData: FormData) {
    return this.http.post(`${environment.adminApiUrl}/product/newProduct`, newData)
  }

  getListOfProducts(queries: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/product/listProducts${queries}`);
  }

  getProductById(id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/product/retrievePorduct/${id}`);
  }

  getCategories(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/category/listCategoreis`);
  }

  getSubCategories(categoryID: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/category/listSubCategories/${categoryID}`);
  }

  updateProduct(productID: string, filedToUpdate: string, newValue: any): Observable<any> {

    return this.http.put(`${environment.adminApiUrl}/product/updateproduct`,
      {
        productID: productID,
        fieldToUpdate: filedToUpdate,
        newValue: newValue
      });
  }

  listProductsImages() {
    return this.http.get(`${environment.adminApiUrl}/uploads/images`)
  }
}
