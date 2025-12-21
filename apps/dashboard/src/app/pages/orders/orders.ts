import { CurrencyPipe, DatePipe, NgClass, PercentPipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersServices } from '@ecommerce-angular/services';
import { Check, LucideAngularModule, SquarePen } from 'lucide-angular';

@Component({
  selector: 'dashboard-orders',
  imports: [
    FormsModule,
    NgClass,
    CurrencyPipe,
    DatePipe,
    PercentPipe,
    LucideAngularModule,
    ReactiveFormsModule,
  ],
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class Orders implements OnInit {
  private orderService = inject(OrdersServices);
  private activeRoute: any = inject(ActivatedRoute);

  ngOnInit(): void {
    this.loadOrders('pending');
  }
  currentList = signal<any[]>([]);

  currentStatus = signal<string>('pending');

  loadOrders(status: string) {
    this.orderService.listOrdersForAdmin(`?status=${status}`).subscribe({
      next: (data) => {
        this.currentList.set(data);
      },
    });
  }

  updateOrder(orderID: string, fieldToUpdate: string, newValue: string) {
    this.orderService
      .updateOrderForAdmin(orderID, fieldToUpdate, newValue)
      .subscribe({
        next: (data) => {
          if (fieldToUpdate === 'status') {
            this.loadOrders(this.currentStatus());
          }
        },
      });
  }

  changeStatus(status: string) {
    this.currentStatus.set(status);
    this.loadOrders(status);
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
}
