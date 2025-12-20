import {
  Component,
  effect,
  inject,
  output,
  signal,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductsServices } from '@ecommerce-angular/services';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'comp-filter-sidebar',
  imports: [CurrencyPipe, FormsModule, ReactiveFormsModule],
  templateUrl: './filterSidebar.html',
  styleUrl: './filterSidebar.css',
})
export class FilterSidebar implements OnInit {
  private productService = inject(ProductsServices);
  private activeRoute: any = inject(ActivatedRoute);

  filterForm = new FormGroup({
    minPrice: new FormControl(0, [
      Validators.required,
      Validators.pattern(/^[0-9]+$/), // ✅ only digits allowed
    ]),
    maxPrice: new FormControl(50000, [
      Validators.required,
      Validators.pattern(/^[0-9]+$/), // ✅ only digits allowed
    ]),
    minDiscount: new FormControl(null),
  });

  currentList = output<any>();

  visible = true;

  showDialog() {
    this.visible = true;
  }

  clearForm() {
    this.filterForm.reset({
      minPrice: 0,
      maxPrice: 50000,
      minDiscount: null, // no radio selected
    });

    this.productService.getListOfProducts('').subscribe({
      next: (res) => {
        console.log(res);

        this.currentList.emit({
          data: res.results,
          count: res.count,
          nextPageQuery: res.next,
        });

        //
      },
    });
  }

  submitFilterForm() {
    this.productService
      .getListOfProducts(
        `?${this.filterForm.value.maxPrice
          ? `price__lte=${this.filterForm.value.maxPrice}`
          : ''
        }&${this.filterForm.value.minPrice
          ? `price__gte=${this.filterForm.value.minPrice}`
          : ''
        }&${this.filterForm.value.minDiscount
          ? `discount__gte=${this.filterForm.value.minDiscount}`
          : ''
        }&category=${this.activeRoute.snapshot.params.name}`
      )
      .subscribe({
        next: (res) => {
          console.log(res);

          this.currentList.emit({
            data: res.results,
            count: res.count,
            nextPageQuery: res.next,
          });
          // this.visible = false;
          // console.log(this.currentList);
          //
        },
      });

    // console.log(this.filterForm.value);
  }
  preventInvalidKeys(event: KeyboardEvent) {
    const allowedKeys = [
      'Backspace',
      // "Tab",
      'ArrowLeft',
      'ArrowRight',
      'Delete',
      // "Home",
      // "End"
    ];

    // Allow control keys
    if (allowedKeys.includes(event.key)) {
      return;
    }

    if (!/^\d$/.test(event.key)) {
      event.preventDefault();
    }
  }
  ngOnInit() { }
}
