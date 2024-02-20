import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  login(email: string, password: string, role: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, { email, password, role }).pipe(
      tap(response => {
        sessionStorage.setItem('token', response.token);
      })
    );
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    sessionStorage.removeItem('token');
  }
}
