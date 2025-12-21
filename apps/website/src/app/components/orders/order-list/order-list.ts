import {
  Component,
  effect,
  inject,
  signal,
  ViewChild,
  OnInit,
} from '@angular/core';
import { OrdersServices } from '@ecommerce-angular/services';
import { ActivatedRoute } from '@angular/router';
import { DatePipe, CurrencyPipe, NgStyle, NgClass } from '@angular/common';

@Component({
  selector: 'app-order-list',
  imports: [DatePipe, CurrencyPipe, NgClass],
  templateUrl: './order-list.html',
  styleUrl: './order-list.css',
})
export class OrderList implements OnInit {
  private orderService = inject(OrdersServices);
  private activeRoute: any = inject(ActivatedRoute);

  currentStatus = signal<string>('pending');
  currentList = signal<any[]>([]);

  changeStatus(status: string) {
    this.currentStatus.set(status);
    // this.orderService.listOrders(`?shipping_status=${status}`).subscribe({
    //   next: (res: any) => {
    //     this.currentList.set(res);
    //   },
    // });
  }

  cancelOrder(orderID: number) {
    // this.orderService.updateOrder(orderID, { shipping_status: 'canceld' }).subscribe({
    //   next: (res: any) => {
    //     console.log(res);
    //   },
    // });
  }

  statusBadgeColor(status: string) {
    if (status === 'pending') {
      return 'badge-warning';
    }
    if (status === 'processing') {
      return 'badge-secondary';
    }
    if (status === 'shipped') {
      return 'badge-success';
    }
    if (status === 'delivered') {
      return 'badge-accent';
    }
    if (status === 'canceld') {
      return 'badge-error';
    }
    return '';
  }

  ngOnInit() {
    this.activeRoute.params.subscribe({
      next: (res: any) => {
        if (res.listType === 'orderList') {
          this.orderService.listOrders(``).subscribe({
            next: (res) => {
              this.currentList.set(res);
              console.log(this.currentList());
            },
          });
        }
      },
    });
  }
}
