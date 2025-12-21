import { NgClass } from '@angular/common';
import { Component, inject, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthSerivce } from '@ecommerce-angular/services';

@Component({
  selector: 'dashboard-users',
  imports: [FormsModule, NgClass],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users implements OnInit {
  private authService = inject(AuthSerivce);

  listOfUsers = signal<any>([]);

  currentStatus = signal<string>('Not Blocked');

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers(isBlocked = false) {
    this.authService.listOfUserForAdmin(`?isBlocked=${isBlocked}`).subscribe({
      next: (data) => {
        this.listOfUsers.set(data);
      },
    });
  }

  changeStatus(isBlocked: boolean) {
    if (isBlocked) {
      this.currentStatus.set('Blocked');
      this.loadUsers(true);
    }

    if (!isBlocked) {
      this.currentStatus.set('Not Blocked');
      this.loadUsers(false);
    }
  }

  updateUser(userID: string, fieldToUpdate: string, newValue: any) {
    this.authService
      .updateUserDatails(userID, fieldToUpdate, newValue)
      .subscribe({
        next: (data) => {
          this.loadUsers(this.currentStatus() === 'Blocked');
        },
      });
  }
}
