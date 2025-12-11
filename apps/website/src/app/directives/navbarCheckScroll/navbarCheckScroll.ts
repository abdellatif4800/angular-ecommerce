import { Directive, ElementRef, HostListener, inject, signal } from '@angular/core';

@Directive({
  selector: '[dirNavbarCheckScroll]',
})
export class NavbarCheckScroll {
  // private el = inject(ElementRef);

  constructor(private el: ElementRef) { }
  private lastScrollTop = signal(0);

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    const currentScroll = window.scrollY;

    if (currentScroll > this.lastScrollTop()) {
      this.el.nativeElement.classList.remove('translate-y-0');
      this.el.nativeElement.classList.add('-translate-y-20');
      // this.el.nativeElement.classList.remove('text-white');
      // this.el.nativeElement.classList.add('text-black');
    } else if (currentScroll < this.lastScrollTop()) {
      this.el.nativeElement.classList.remove('-translate-y-20');
      this.el.nativeElement.classList.add('translate-y-0');
      // this.el.nativeElement.classList.add('bg-red-500');
      // this.el.nativeElement.classList.add('text-white');
    }
    if (currentScroll == 0) {
      // this.el.nativeElement.classList.remove('bg-red-500');
      // this.el.nativeElement.classList.add('bg-blue-500');
    }

    // console.log(currentScroll)
    this.lastScrollTop.set(currentScroll);
  }
}
