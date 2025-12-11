import { Component } from '@angular/core';

@Component({
  selector: 'layout-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  socialLogos = [
    {
      link: 'https://facebook.com',
      image: 'social/facebook.svg',
    },
    {
      link: 'https://instagram.com',
      image: 'social/instagram.svg',
    },
  ];

  paymentLogos = [
    'paymentLogos/stripe.svg',
    'paymentLogos/mastercard.svg',
    'paymentLogos/visa.svg',
  ];
}
