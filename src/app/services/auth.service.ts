import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Adjust this URL to exactly match your backend
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  login(user: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, user);
  }
}
