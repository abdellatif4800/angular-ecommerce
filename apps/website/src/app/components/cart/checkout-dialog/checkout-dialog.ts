import {
  ChangeDetectorRef,
  Component,
  inject,
  input,
  ViewChild,
  ElementRef,
  signal,
  effect, OnInit,
} from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// import { CartServices } from '../../../services/cartServices/cart-services';
import { AuthSerivce, CartServices, CheckoutService } from '@ecommerce-angular/services';
import { NgClass, CurrencyPipe, NgStyle } from '@angular/common';


@Component({
  selector: 'app-checkout-dialog',
  imports: [
    CurrencyPipe,
    FormsModule,
    ReactiveFormsModule,
    NgStyle,
    NgClass,
  ],
  templateUrl: './checkout-dialog.html',
  styleUrl: './checkout-dialog.css',
})
export class CheckoutDialog implements OnInit {
  private checkoutService = inject(CheckoutService);
  private cartService = inject(CartServices);
  private readonly activeRoute = inject(ActivatedRoute);
  private cd = inject(ChangeDetectorRef);
  private authService = inject(AuthSerivce)
  private router = inject(Router)

  currentCart = input<any>({});
  paymentMethods: any[] = [{ name: 'Cash on delivery' }, { name: 'by card' }];
  selectedPayment_method: any | undefined;

  @ViewChild('paymentElement') paymentElementRef!: ElementRef;

  checkoutForm = new FormGroup({
    shippning_address: new FormControl(''),
    payment_method: new FormControl<any>(null),
  });

  visible = false;

  paymentELementVisible = signal(false);
  disablePayButton = signal(true);

  async ngOnInit() {
    if (this.paymentELementVisible()) {
      this.checkoutForm.get('shippning_address')?.disable();
      this.checkoutForm.get('payment_method')?.disable();
    } else {
      this.checkoutForm.get('payment_method')?.enable();
      this.checkoutForm.get('shippning_address')?.enable();
    }
    // const paymentElement = await this.checkoutService.initElements(
    //   'pi_3SDTqEH05IPbx08P1wRXKz3j_secret_OB0zhskpCZ5mHGQSZitca0xcl',
    // );
    // paymentElement.mount(this.paymentElementRef.nativeElement);
    // paymentElement.on('change', (event) => {
    //   if (event.complete) {
    //     this.disablePayButton.set(false);
    //   }
    // });
  }


  placeOrder() {

    const placeOrderData = {
      cartID: this.authService.decodedToken.cartID,
      userId: this.authService.decodedToken.id,
      address: this.checkoutForm.get('shippning_address')?.value,
      payment: this.checkoutForm.get('payment_method')?.value
    }

    this.checkoutService.placeOrder({
      cartID: placeOrderData.cartID,
      userId: placeOrderData.userId,
      address: placeOrderData.address,
      paymentMethod: placeOrderData.payment
    }).subscribe({
      next: (res) => {
        // this.router.navigate(['/userLists', 'orderList'])
        this.cartService.currentListTab.set(2)
      }
    })
  }

  checkout() {
    const checkoutBody = {
      shipping_address: this.checkoutForm.value.shippning_address,
      payment_method: this.checkoutForm.value.payment_method,
    };
    // console.log(checkoutBody);

    this.checkoutService.checkout(checkoutBody).subscribe({
      next: async (res: any) => {
        console.log(res);
        if (res.paymentIntent) {
          this.paymentELementVisible.set(true);
          const paymentElement = await this.checkoutService.initElements(
            res.paymentIntent.client_secret,
          );
          paymentElement.mount(this.paymentElementRef.nativeElement);
          paymentElement.on('change', (event) => {
            if (event.complete) {
              this.disablePayButton.set(false);
            }
          });
        } else {
          window.location.reload();
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  submitPayment() {
    this.checkoutService.submitPayment().then((res) => {
      console.log(res);

      if (res.error) {
        console.error(res.error.message);
      } else {
        this.checkoutService.clearCartAfterPayment().subscribe({
          next: () => console.log('cart cleard'),
        });
      }
    });
  }
}
