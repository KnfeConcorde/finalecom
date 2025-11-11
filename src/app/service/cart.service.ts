// import { Injectable } from '@angular/core';
// import { BaseHttpService } from './base-http.service';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { environment } from '../../environments/environment';

// @Injectable({
//   providedIn: 'root'
// })
// export class CartService extends BaseHttpService{

//   constructor(protected override http: HttpClient) { 
//     // super(http, '/api/cart')
//     super(http, '/api/orderitem')
//   }

//   // ✅ Explicit endpoint methods
//   getByCustomer(customerId: number, status: number): Observable<any> {
//     return this.http.get(`${environment.apiBaseUrl}/api/orderitem/${customerId}?status=${status}`);
//   }

//   addItem(item: any): Observable<any> {
//     return this.http.put(`${environment.apiBaseUrl}/api/orderitem`, item);
//   }

// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = `${environment.apiBaseUrl}/api/orderitem`;

  constructor(private http: HttpClient) {}

  addToCart(item: any): Observable<any> {
    // json-server uses POST for creating new items, PUT for updating
    return this.http.post(this.apiUrl, item);
  }

  getCart(customerId: number): Observable<any> {
    // json-server uses query parameters for filtering
    // Access direct endpoint for filtering since routes.json doesn't preserve query params well
    const directUrl = `${environment.apiBaseUrl}/orderitem?customerId=${customerId}&status=0`;
    console.log('Fetching cart from:', directUrl);
    return this.http.get(directUrl);
  }

  deleteItem(id: number): Observable<any> {
    // Use direct endpoint for delete since routes.json might not handle it correctly
    const directUrl = `${environment.apiBaseUrl}/orderitem/${id}`;
    console.log('Deleting item from:', directUrl);
    return this.http.delete(directUrl);
  }

  updateCartItem(item: any): Observable<any> {
    // Use direct endpoint for update to be consistent
    const directUrl = `${environment.apiBaseUrl}/orderitem/${item.id}`;
    console.log('Updating item at:', directUrl, item);
    return this.http.put(directUrl, item);
  }

}
