 
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {}
  private apiUrl = 'http://localhost:8080/api';

  listAllProducts():Observable<Product[]>{
    return this.http.get<Product[]>(`${this.apiUrl}/get-all-products`)
  }

  searchProducts(searchTerm: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/Search-products-by-title`, {
        params: { title: searchTerm }
    });
  }
   filterProducts(categoryId: number, minPrice: number, maxPrice: number, sortBy?: string): Observable<Product[]> {
    let params: any = {
      category_id: categoryId,
      minPrice: minPrice,
      maxPrice: maxPrice
    };
     if (categoryId) {
      params.category_id = categoryId;
    }
    if (sortBy) {
      params.sortBy = sortBy;
    }
    return this.http.get<Product[]>(`${this.apiUrl}/filter-products`, { params });
  }
}
