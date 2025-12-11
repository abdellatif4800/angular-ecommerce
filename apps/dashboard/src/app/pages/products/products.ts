import { Component, signal, OnInit, inject, effect } from '@angular/core';
import { ProductsServices } from '@ecommerce-angular/services';
import { IProduct } from '@ecommerce-angular/models';
import { CurrencyPipe, DatePipe, NgClass, PercentPipe } from '@angular/common';
import { LucideAngularModule, SquarePen, Check, Search } from 'lucide-angular';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NewProductForm } from '../../components/newProductForm/newProductForm';
import { ImagesModal } from '../../components/imagesModal/imagesModal';

@Component({
  selector: 'dashboard-products',
  imports: [ImagesModal, NewProductForm, NgClass, CurrencyPipe, DatePipe, PercentPipe, LucideAngularModule, ReactiveFormsModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  private productServices = inject(ProductsServices)

  readonly editIcon = SquarePen
  readonly checkIcon = Check
  readonly searchIcon = Search


  products = signal<IProduct[]>([])

  productName = new FormControl('')
  price = new FormControl('')
  stock = new FormControl('')
  discount = new FormControl('')

  editingField = signal<any>({});

  publishedlist = signal<string>('published')

  filterFieldsGroup = new FormGroup({
    minPrice: new FormControl(null, [Validators.pattern(/^\d*$/)]),
    maxPrice: new FormControl(null),

    minStock: new FormControl(null),
    maxStock: new FormControl(null),

    published: new FormControl('true')
  })

  searchTextContorl = new FormControl('')
  searchFieldContorl = new FormControl('Name Or ID')

  images = signal<any>([])

  constructor() {
    effect(() => {
      this.productServices.refreshProducts();
      this.loadProducts(``)

    })
  }

  ngOnInit() {
    this.loadProducts(``)
  }

  loadProducts(queries: string) {
    this.productServices.getListOfProducts(queries).subscribe({
      next: (data) => {
        this.products.set(data)
      }
    })

  }

  handleChangeImage(productID: string, imageName: string) {
    this.productServices.updateProduct(productID, 'imageUrl', `http://localhost:8001/uploads/${imageName}`).subscribe({
      next: (data) => {
        this.loadProducts(``)
      }
    })
  }


  changePublishedList(publishStatus: string) {
    this.publishedlist.set(publishStatus === 'published' ? "published" : "unPublished");
    this.loadProducts(`?publish=${publishStatus === 'published' ? true : false}`)
  }

  submitFilter() {
    const { published, maxStock, minStock, minPrice, maxPrice } = this.filterFieldsGroup.value;

    const query = [];

    if (minPrice) query.push(`priceMin=${minPrice}`);
    if (maxPrice) query.push(`priceMax=${maxPrice}`);

    if (minStock) query.push(`stockMin=${minStock}`);
    if (maxStock) query.push(`stockMax=${maxStock}`);

    if (published) query.push(`publish=${published}`);

    const finalQuery = query.length > 0 ? `?${query.join("&")}` : "";

    this.loadProducts(finalQuery)
    // console.log(this.filterFieldsGroup.value)
    // console.log(finalQuery)
  }

  resetFilters() {
    this.filterFieldsGroup.reset()
    //   {
    //   published: "",
    //   minPrice: "",
    //   maxPrice: "",
    //   minStock: "",
    //   maxStock: ""
    // }
    // );

    this.loadProducts("");
  }

  searchForProductByName() {
    if (this.searchFieldContorl.value === 'name') {
      this.loadProducts(`?productName=${this.searchTextContorl.value}`)
    }

    if (this.searchFieldContorl.value === 'id') {
      this.loadProducts(`?id=${this.searchTextContorl.value}`)
    }

  }

  setEditMode(product: any, targetFiled: string) {
    this.editingField.set({ prodId: product._id, field: targetFiled });

    if (targetFiled === 'productName') {
      this.productName.setValue(product.productName);
    }

    if (targetFiled === 'price') {
      this.price.setValue(product.price);
    }

    if (targetFiled === 'stock') {
      this.stock.setValue(product.stock);
    }
  }

  saveEditingFiled(productID: any, fieldToUpdate: any) {

    if (fieldToUpdate === 'productName') {

      this.productServices.updateProduct(productID, 'productName', this.productName.value).subscribe({
        next: (data) => {
          this.loadProducts(``)
        }
      })
    }

    if (fieldToUpdate === 'price') {
      this.productServices.updateProduct(productID, 'price', Number(this.price.value)).subscribe({
        next: (data) => {
          this.loadProducts(``)
        }
      })
    }

    if (fieldToUpdate === 'stock') {
      this.productServices.updateProduct(productID, 'stock', Number(this.stock.value)).subscribe({
        next: (data) => {
          this.loadProducts(``)
        }
      })
    }

    this.editingField.set({})

  }

  changePublishStatu(productID: string, statu: boolean) {
    this.productServices.updateProduct(productID, 'publish', statu).subscribe({
      next: (data) => {
        this.loadProducts(``)
      }
    })

  }
}



