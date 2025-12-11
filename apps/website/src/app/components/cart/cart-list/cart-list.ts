import { NgClass, NgStyle } from '@angular/common';
import { ChangeDetectorRef, Component, inject, NgZone, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartServices } from '@ecommerce-angular/services'
import { CheckoutDialog } from '../checkout-dialog/checkout-dialog';
import { LucideAngularModule, Minus, Plus, Trash } from 'lucide-angular';

@Component({
  selector: 'app-cart-list',
  imports: [
    LucideAngularModule,
    CheckoutDialog,
    NgClass,
    NgStyle,
    FormsModule,
  ],
  templateUrl: './cart-list.html',
  styleUrl: './cart-list.css',
})
export class CartList implements OnInit {
  private cartServices = inject(CartServices);
  private cd = inject(ChangeDetectorRef);

  readonly MinusIcon = Minus;
  readonly PlusIcon = Plus;
  readonly TrashIcon = Trash;

  cartItems = signal<any[]>([]);
  cartTotal = signal<number>(0);

  loadCartData() {
    this.cartServices.retrieveCart().subscribe({
      next: (res: any) => {

        this.cartItems.set(res.items)
        this.cartTotal.set(res.cartTotal)
      }
    })

  }

  ngOnInit() {
    this.loadCartData()
  }

  priceAfterDiscount = (price: number, discount: number) => {
    // return price - (price * discount) / 100;
    return Math.round((price - (price * discount) / 100) * 100) / 100;
  };

  loadingItems = new Set<number>();
  isLoading(itemId: number): boolean {
    return this.loadingItems.has(itemId);
  }

  currentStep = signal(1);
  changeCurrentStep(targetStep: number) {
    this.currentStep.set(targetStep)
    if (this.currentStep() === 1) {
      this.loadCartData()
    }
  }

  changeAmount(item: any, event: any) {
    if (typeof event.value === 'number') {
      const newQuantity = event.value;

      this.loadingItems.add(item.id);

      this.cartServices.changeItemAmount(item.id, newQuantity).subscribe({
        next: (res: any) => {
          // this.zone.onStable.pipe(take(1)).subscribe(() => {
          // item.item_total = res.item.item_total;
          // });

          item.item_total = res.item.item_total;
          this.cartTotal.set(res.cart.cart_total);
          this.cd.detectChanges();
          console.log(res);
        },

      });
    }
  }

  deleteItem(itemID: number) {
    this.cartServices.deleteItme(itemID).subscribe((res: any) => {
      this.cartItems.set(res.cart.cart_items);
      this.cartTotal.set(res.cart.cart_total);
      // this.messageService.add({
      //   severity: 'danger',
      //   summary: 'Info',
      //   detail: 'Item deleted',
      //   life: 3000,
      // });
      console.log(res.cart);
    });
  }

  clearCart() {
    this.cartServices.clearCart().subscribe({
      next: (res) => {
        // console.log(res);
        // this.messageService.add({
        //   severity: 'error',
        //   summary: 'Info',
        //   detail: 'Cart Cleard',
        //   life: 3000,
        // });

        this.cartItems.set(res.cart.cart_items);
        this.cartTotal.set(res.cart.cart_total);
      },
      error: (err) => {
        if (err.error === 'Cart is empty') {
          // this.messageService.add({
          //   severity: 'error',
          //   summary: 'Info',
          //   detail: 'Cart Is Empty',
          //   life: 3000,
          // });
        }
      },
    });
  }

}
