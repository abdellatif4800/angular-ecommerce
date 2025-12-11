import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Layout } from './layout/layout/layout';

@Component({
  imports: [Layout, RouterModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'website';

}
