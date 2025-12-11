import { Component, inject, signal } from '@angular/core';
import { ProductCard } from '../../products/productCard/productCard';
import { NgStyle } from '@angular/common';
import { LucideAngularModule, ArrowBigRight, ArrowBigLeft } from 'lucide-angular';

@Component({
  selector: 'toprated-products',
  imports: [LucideAngularModule, NgStyle, ProductCard],
  templateUrl: './toprated-products.html',
  styleUrl: './toprated-products.css',
})
export class TopratedProducts { }
