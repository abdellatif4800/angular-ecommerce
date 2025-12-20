import { NgClass, NgStyle } from '@angular/common';
import { Component, signal, OnInit, OnDestroy, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  LucideAngularModule,
  CircleChevronRight,
  CircleChevronLeft,
} from 'lucide-angular';

@Component({
  selector: 'comp-ads-carousel',
  standalone: true,
  imports: [NgStyle, NgClass, LucideAngularModule],
  templateUrl: './adsCarousel.html',
  // Removed styleUrl as Tailwind classes are sufficient,
  // but keep it if you have custom CSS.
})
export class AdsCarousel implements OnInit, OnDestroy {
  readonly CircleChevronRight = CircleChevronRight;
  readonly CircleChevronLeft = CircleChevronLeft;
  private router = inject(Router);

  // Auto-play interval reference
  private autoPlayInterval: any;

  ads = [
    {
      bg_color: 'blue',
      ad_text: 'Ad 1',
      adContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed.',
      ad_img: 'ads/ad1.png',
      link: '/products/list' // Added link
    },
    {
      bg_color: 'red',
      ad_text: 'Ad 2',
      adContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed.',
      ad_img: 'ads/ad2.png',
      link: '/products/electronics' // Added link
    },
    {
      bg_color: 'gray',
      ad_text: 'Ad 3',
      adContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed.',
      ad_img: 'ads/ad3.png',
      link: '/products/clothing' // Added link
    },
    {
      bg_color: 'green',
      ad_text: 'Ad 4',
      adContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed.',
      ad_img: 'ads/ad4.png',
      link: '/products/sale' // Added link
    },
  ];

  currentAdIndex = signal(0);

  // Manual navigation via dots
  goToAd(index: number) {
    this.resetAutoPlay();
    this.currentAdIndex.set(index);
  }

  navigateToProduct(url: string | undefined) {
    if (url) {
      this.router.navigate([url]);
    } else {
      this.router.navigate(['/products']); // Fallback
    }
  }
  nextAd() {
    this.resetAutoPlay();
    this.currentAdIndex.update((current) =>
      current === this.ads.length - 1 ? 0 : current + 1
    );
  }

  prevAd() {
    this.resetAutoPlay();
    this.currentAdIndex.update((current) =>
      current === 0 ? this.ads.length - 1 : current - 1
    );
  }

  private resetAutoPlay() {
    clearInterval(this.autoPlayInterval);
    this.startAutoPlay();
  }

  private startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.currentAdIndex.update((current) =>
        current === this.ads.length - 1 ? 0 : current + 1
      );
    }, 1500); // 4 seconds per slide
  }

  ngOnInit() {
    this.startAutoPlay();
  }

  ngOnDestroy() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }
}
