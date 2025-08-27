import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../model/Product';
import { CartItem } from '../model/CartItem';



@Injectable({
  providedIn: 'root'
})
export class CartService {

  private baseUrl = 'http://localhost:8080/api/cart';

  constructor(private http: HttpClient) { }
   private cartItems: CartItem[] = [];

   getCartItems(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.baseUrl}`);
  }

addToCart(cartItemDTO: any) {
  return this.http.post('http://localhost:8080/api/cart/add', cartItemDTO);
}

  removeCartItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  // removeFromCart(productId: number): Observable<any> {
  //   return this.http.delete(`${this.apiUrl}/remove/${productId}`);
  // }
}
export { CartItem };

