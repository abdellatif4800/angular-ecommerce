import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule, User, Shirt, House, List } from 'lucide-angular';

@Component({
  selector: 'dashboard-sidebar',
  imports: [RouterLinkActive, RouterLink, LucideAngularModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  readonly shirtIcon = Shirt
  readonly homeIcon = House
  readonly ordersIcon = List
  readonly usersIcon = User

}
