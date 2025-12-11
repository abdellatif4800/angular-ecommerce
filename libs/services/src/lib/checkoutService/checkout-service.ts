import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@ecommerce-angular/environments';
import { loadStripe, StripeElements } from '@stripe/stripe-js';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private http = inject(HttpClient);
  private cookies = inject(CookieService);

  userData = JSON.parse(this.cookies.get('userdata'));
  token = JSON.parse(this.cookies.get('token'));

  private stripePromise = loadStripe(
    'pk_test_51QbqpvH05IPbx08PKi322LDYHCXMl74z0hRQMOTmuuRhT0werRchWRiCMSJBkGCcIh89NVqFqUoMrA6Lr1jnEau500ACEJ7GPn',
  );
  private elements!: StripeElements;

  async initElements(clientSecret: string) {
    const stripe = await this.stripePromise;
    if (!stripe) throw new Error('Stripe not loaded');

    this.elements = stripe.elements({ clientSecret });
    return this.elements.create('payment');
  }

  clearCartAfterPayment(): Observable<any> {
    return this.http.delete(
      `http://localhost:8000/cart/clearCartAfterPayment/${this.userData.cartID}/`,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      },
    );
  }

  async submitPayment() {
    const stripe = await this.stripePromise;
    if (!stripe || !this.elements) throw new Error('Stripe not ready');

    const { error } = await this.elements.submit();
    if (error) {
      console.error(error.message);
      return { error };
    }

    return await stripe.confirmPayment({
      elements: this.elements,
      confirmParams: {
        return_url: 'http://localhost:4200/userLists/orderList', // change for your flow
      },
    });
  }

  placeOrder(orderData: any) {
    return this.http.post(`${environment.apiUrl}/order/placeOrder`, orderData)
  }

  checkout(checkoutData: any) {
    return this.http.post(
      `http://localhost:8000/order/checkoutCart/${this.userData.cartID}/`,
      {
        shipping_address: checkoutData.shipping_address,
        payment_method: checkoutData.payment_method,
      },
      // {
      //   headers: {
      //     Authorization: `Bearer ${this.token}`,
      //   },
      // },
    );
  }

  stripeCheckout(orderID: number) {
    return this.http.post(
      `http://localhost:8000/payment/stripe_checkout/${orderID}/`,
      {},
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      },
    );
  }
}
