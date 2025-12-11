import { NgStyle, NgClass } from '@angular/common';
import { Component, signal } from '@angular/core';
import { LucideAngularModule, CircleChevronRight, CircleChevronLeft } from 'lucide-angular';

@Component({
  selector: 'comp-ads-carousel',
  imports: [NgStyle, NgClass, LucideAngularModule],
  templateUrl: './adsCarousel.html',
  styleUrl: './adsCarousel.css',
})
export class AdsCarousel {
  readonly CircleChevronRight = CircleChevronRight;
  readonly CircleChevronLeft = CircleChevronLeft;

  ads = [
    {
      bg_color: 'blue',
      ad_text: 'Ad 1',
      adContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed.',
      ad_img: 'ads/ad1.png',
    },
    {
      bg_color: 'red',
      ad_text: 'Ad 2',
      adContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed.',
      ad_img: 'ads/ad2.png',
    },
    {
      bg_color: 'gray',
      ad_text: 'Ad 3',
      adContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed.',
      ad_img: 'ads/ad3.png',
    },
    {
      bg_color: 'green',
      ad_text: 'Ad 4',
      adContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed.',
      ad_img: 'ads/ad4.png',
    },
  ];

  currentAdIndex = signal(0);
  adOpacity = signal('black');
  textTranslateAnimation = signal('0px');

  showImage = true;

  imageStyles = () => ({
    opacity: this.adOpacity(),
  });

  textStyles = () => ({
    translate: this.textTranslateAnimation(),
    opacity: this.adOpacity(),
  });

  goToAd(index: number) {
    this.adOpacity.set('0');
    // this.textTranslateAnimation.set('-100px');

    setTimeout(() => {
      this.adOpacity.set('1');
      // this.textTranslateAnimation.set('0px');
      this.currentAdIndex.set(index);
    }, 1000);
  }

  arrowBtns(direction: string) {
    this.adOpacity.set('0');
    this.textTranslateAnimation.set('-100px');

    setTimeout(() => {
      this.adOpacity.set('1');
      this.textTranslateAnimation.set('0px');
      if (direction === 'right') {
        if (this.currentAdIndex() === this.ads.length - 1) {
          this.currentAdIndex.set(0);
        } else {
          this.currentAdIndex.update((current) => current + 1);
        }
      }
      if (direction === 'left') {
        if (this.currentAdIndex() === 0) {
          this.currentAdIndex.set(this.ads.length - 1);
        } else {
          this.currentAdIndex.update((current) => current - 1);
        }
      }
    }, 1000);
  }

  ngOnInit() {
    // setInterval(() => {
    //   setTimeout(() => {
    //     if (this.currentAdIndex() >= this.ads.length - 1) {
    //       this.currentAdIndex.set(0)
    //     } else {
    //       this.currentAdIndex.update(n => n + 1);
    //     }
    //     this.showImage = true;
    //   }, 500);
    //   // console.log(this.currentAdIndex());
    // }, 2000);
  }
}
