import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Layout } from './layout/layout/layout';

@Component({
  imports: [RouterModule, Layout],
  selector: 'dashboard-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'dashboard';
}
