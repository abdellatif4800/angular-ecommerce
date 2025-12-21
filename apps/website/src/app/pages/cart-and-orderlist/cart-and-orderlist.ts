import { Component, effect, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CartList } from '../../components/cart/cart-list/cart-list';
import { OrderList } from '../../components/orders/order-list/order-list';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartServices } from '@ecommerce-angular/services';

@Component({
  selector: 'app-cart-and-orderlist',
  imports: [RouterLink, CommonModule, OrderList, CartList, FormsModule],
  templateUrl: './cart-and-orderlist.html',
  styleUrl: './cart-and-orderlist.css',
})
export class CartAndOrderlist implements OnInit {
  private activeRoute: any = inject(ActivatedRoute);
  private cartService = inject(CartServices);

  currentTab = this.cartService.currentListTab;

  changeTab(targetList: number) {
    this.cartService.currentListTab.set(targetList);
  }

  ngOnInit() {
    if (this.activeRoute.snapshot.params.listType === 'cart') {
      this.currentTab.set(1);
    }
    if (this.activeRoute.snapshot.params.listType === 'orderList') {
      this.currentTab.set(2);
    }
    if (this.activeRoute.snapshot.params.listType === 'wishlist') {
      this.currentTab.set(3);
    }
  }
}
