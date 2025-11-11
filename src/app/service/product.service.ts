import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { Observable, of } from 'rxjs';
import { Product } from '../model/product';
import { HttpClient } from '@angular/common/http';
import { ProductCategory } from '../model/product-category';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseHttpService{

  constructor(protected override http: HttpClient) { 
    super(http, '/api/product')
  }

  override getData(): Observable<ProductCategory[]> {
    return super.getData().pipe(
      map((response: any) => {
        if (Array.isArray(response) && response.length > 0) {
          return response as ProductCategory[];
        }
        return this.getFallbackProducts();
      }),
      catchError(() => of(this.getFallbackProducts()))
    );
  }

  private getFallbackProducts(): ProductCategory[] {
    return [
      {
        categoryName: 'Fragrances',
        products: [
          {
            id: 1,
            name: 'Yves Saint Laurent Y Eau de Parfum',
            description: 'Woody Aromatic • Apple, Bergamot, Ginger',
            categoryName: 'Fragrances',
            imageFile: 'assets/products/saintlaurent.avif',
            price: '8,700',
            unitOfMeasure: '100ml'
          },
          {
            id: 2,
            name: 'Bleu de Chanel Eau de Parfum',
            description: 'Aromatic-woody fragrance • Citrus, lemon zest, mint',
            categoryName: 'Fragrances',
            imageFile: 'assets/products/bleuchanel.avif', // src/assets/products/Baguette_Black.png
            price: '4,000',
            unitOfMeasure: '100ml'
          }
        ]
      },
      {
        categoryName: 'Discovery Sets',
        products: [
          {
            id: 3,
            name: 'Versace Eros Flame',
            description: 'Mint leaves, green apple, and Italian lemon zest',
            categoryName: 'Discovery Sets',
            imageFile: 'assets/products/eros.jpg', // src/assets/products/Baguette_Silver.png
            price: '5,200',
            unitOfMeasure: '100ml'
          }
        ]
      }
    ];
  }
}
