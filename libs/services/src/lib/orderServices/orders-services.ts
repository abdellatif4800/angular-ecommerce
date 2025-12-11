import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@ecommerce-angular/environments';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { AuthSerivce } from '../authService/auth.serivce';

@Injectable({
  providedIn: 'root',
})
export class OrdersServices {
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


  listOrdersForAdmin(queries: any): Observable<any> {
    return this.http.get(`${environment.adminApiUrl}/order/listOrders${queries}`)
  }

  updateOrderForAdmin(orderID: string, fieldToUpdate: string, newValue: any): Observable<any> {
    return this.http.put(`${environment.adminApiUrl}/order/updateOrder`,
      {
        orderID: orderID,
        fieldToUpdate: fieldToUpdate,
        newValue: newValue
      })
  }

  listOrders(queries: string): Observable<any> {
    return this.http.get(
      `http://localhost:8000/order/listorderForUser/${this.userData.id}${queries}`,
      // {
      //   headers: {
      //     Authorization: `Bearer ${this.token}`,
      //   },
      // },
    );
  }
  //
  // updateOrder(orderID: number, updatedFields: any): Observable<any> {
  //   return this.http.patch(
  //     `http://localhost:8000/order/user/${this.userData.id}/userUpdateOrder/${orderID}/`,
  //     updatedFields,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${this.token}`,
  //       },
  //     },
  //   );
  // }
}
