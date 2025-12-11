import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductsServices } from '@ecommerce-angular/services';
import { NgClass, UpperCasePipe } from '@angular/common'; // Import UpperCasePipe

@Component({
  selector: 'page-categories',
  imports: [NgClass, UpperCasePipe, RouterLink],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories implements OnInit {
  private productService = inject(ProductsServices);

  currentList = signal<any>([]);
  currentListName = signal<string>('categories');

  changeList(id: string) {

    this.productService.getSubCategories(id).subscribe({
      next: (res) => {
        this.currentList.set(res);
        this.currentListName.set('subCategories')
      }
    })
  }

  ngOnInit() {
    this.productService.getCategories().subscribe({
      next: (res) => {
        // console.log(res);

        this.currentList.set(res);
      },
    });
  }
}
