import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '@ecommerce-angular/environments';
import { AuthSerivce } from '../authService/auth.serivce';

@Injectable({
  providedIn: 'root',
})
export class CartServices {
  private http = inject(HttpClient);
  private cookies = inject(CookieService);
  private authService = inject(AuthSerivce)

  private get userData() {
    const data = this.cookies.get('userdata');
    return data ? JSON.parse(data) : null;
  }
  private get token() {
    if (this.cookies.get('token')) return JSON.parse(this.cookies.get('token'));
  }


  currentListTab = signal(1)

  addItemToCart(productID: string) {
    return this.http.post(
      `${environment.apiUrl}/cart/addItemToCart`,
      {
        productID: productID,
        cartID: this.authService.decodedToken.cartID
      },
      // {
      //   headers: {
      //     Authorization: `Bearer ${this.token}`,
      //   },
      // },
    );
  }

  retrieveCart() {
    console.log(this.authService.decodedToken.id)
    return this.http.get(`${environment.apiUrl}/cart/retrieveCart/${this.authService.decodedToken.id}`)
  }

  getCartByUser(): Observable<any> {
    return this.http.get(`http://localhost:8000/cart/retriveCart/${this.userData.cartID}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  changeItemAmount(itemID: number, newQuantity: number) {
    return this.http.put(
      `http://localhost:8000/cart/changeQuantity/${itemID}/`,
      {
        quantity: newQuantity,
      },
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      },
    );
  }
  deleteItme(itemID: number): Observable<any> {
    return this.http.delete(`http://localhost:8000/cart/removeItemFormCart/${itemID}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  clearCart(): Observable<any> {
    return this.http.delete(`http://localhost:8000/cart/clear_cart/${this.userData.cartID}/`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }
}
