import {
  Component,
  DestroyRef,
  effect,
  inject,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { Navbar } from '../navbar/navbar';
import {
  ActivatedRoute,
  Event,
  Router,
  NavigationStart,
  NavigationEnd,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { Sidebar } from '../sidebar/sidebar';

@Component({
  selector: 'dashboard-layout',
  imports: [Sidebar, Navbar, RouterModule, RouterOutlet],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {}
