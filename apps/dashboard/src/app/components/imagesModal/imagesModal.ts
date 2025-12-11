import { Component, ElementRef, inject, ViewChild, OnInit, signal, output } from '@angular/core';
import { ProductsServices } from '@ecommerce-angular/services';
import { LucideAngularModule, SquarePen, } from 'lucide-angular';

@Component({
  selector: 'dashboard-images-modal',
  imports: [LucideAngularModule],
  templateUrl: './imagesModal.html',
  styleUrl: './imagesModal.css',
})
export class ImagesModal implements OnInit {
  private productService = inject(ProductsServices)
  readonly editIcon = SquarePen

  images = signal<any>([])

  imageName = output<string>();

  ngOnInit() {
    this.productService.listProductsImages().subscribe({
      next: (res) => {
        this.images.set(res);
        console.log(this.images());


      }
    })
  }

  selectImage(fileName: string) {
    this.imageName.emit(fileName);
    this.closeModal()
  }

  @ViewChild('imagesModal') imagesModal!: ElementRef<HTMLDialogElement>;

  openModal() {
    this.imagesModal.nativeElement.showModal();
  }

  closeModal() {
    this.imagesModal.nativeElement.close();
  }

}
