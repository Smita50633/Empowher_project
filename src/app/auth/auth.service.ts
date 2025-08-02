import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';

interface User {
  email: string;
  password: string;
  role?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   private baseUrl = 'http://localhost:8080/api/auth'; // Spring Boot base URL

  constructor(private http: HttpClient) {}

  login(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, user);
  }

  register(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/forgot-password`, { email });
  }
}
