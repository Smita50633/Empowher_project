import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:8080/api/cart';

  constructor(private http: HttpClient) { }

  addToCart(productId: number, quantity: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, { productId, quantity });
  }

  getCart(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  // removeFromCart(productId: number): Observable<any> {
  //   return this.http.delete(`${this.apiUrl}/remove/${productId}`);
  // }
}
