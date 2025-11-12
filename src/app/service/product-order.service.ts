import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface ProductOrder {
  id?: number;
  name: string;
  email: string;
  date: string;
  rolls: number;
  message: string;
  total: number;
}

@Injectable({
  providedIn: 'root'   // <-- This is required for Angular DI
})
export class ProductOrderService {
  private apiUrl = 'http://localhost:3000/booking';

  constructor(private http: HttpClient) {}

  createOrder(order: ProductOrder): Observable<ProductOrder> {
    return this.http.post<ProductOrder>(this.apiUrl, order);
  }

  getLatestBooking(): Observable<ProductOrder> {
    return this.http.get<ProductOrder[]>(`${this.apiUrl}?_sort=id&_order=desc&_limit=1`)
      .pipe(map(bookings => bookings[0]));
  }
}
