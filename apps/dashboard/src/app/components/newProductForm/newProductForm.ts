import { Component, ElementRef, ViewChild, OnInit, input, Input, inject, signal } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductsServices } from '@ecommerce-angular/services';

@Component({
  selector: 'dashboard-new-product-form',
  imports: [ReactiveFormsModule],
  templateUrl: './newProductForm.html',
  styleUrl: './newProductForm.css',
})
export class NewProductForm implements OnInit {
  private productServices = inject(ProductsServices)

  ngOnInit() {
    this.productServices.getCategories().subscribe({
      next: (data) => {
        this.categoriesList.set(data)
        console.log(this.categoriesList())
      }
    })
  }

  categoriesList = signal<any>([])

  @ViewChild('newProductModal') formModal!: ElementRef<HTMLDialogElement>;

  openModal() {
    this.formModal.nativeElement.showModal();
  }

  closeModal() {
    this.formModal.nativeElement.close();
  }



  productForm = new FormGroup({
    productName: new FormControl('',),
    price: new FormControl(null,),
    stock: new FormControl(null,),
    subCategoryID: new FormControl('',),
    image: new FormControl('')
  });

  selectedFile: File | any = null;
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      console.log('Selected file:', this.selectedFile);
    }
  }

  submitForm() {
    const uploadData = new FormData();

    uploadData.append('productName', this.productForm.get('productName')!.value || '');
    uploadData.append('price', this.productForm.get('price')!.value || '');
    uploadData.append('stock', this.productForm.get('stock')!.value || '');
    uploadData.append('subCategoryID', this.productForm.get('subCategoryID')!.value || '');

    uploadData.append('image', this.selectedFile, this.selectedFile.name);


    this.productServices.createProduct(uploadData).subscribe({
      next: (data) => {
        this.productServices.refreshProducts.update(v => v + 1);
        this.productForm.reset()
        this.closeModal()
      }
    })
  }

}
