import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);
  private readonly cookieService = inject(CookieService);
  private readonly router = inject(Router);

  registerForm(data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + 'auth/signup', data);
  }

  loginForm(data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + 'auth/signin', data);
  }

  logout(): void {
    this.cookieService.delete('token');
    this.router.navigate(['/login']);
  }

decodeToken(): any {
  try {
    const token = this.cookieService.get('token');
    if (!token) {
      this.logout();
      return null;
    }
    const decoded = jwtDecode(token);
    console.log("Decoded Token Payload:", decoded); 
    return decoded;
  } catch (error) {
    this.logout();
    return null;
  }
}

  submitVerifyEmail(data: object): Observable<any> {
    return this.httpClient.post(
      environment.baseUrl + `auth/forgotPasswords`,
      data
    );
  }
  submitVerifyCode(data: object): Observable<any> {
    return this.httpClient.post(
      environment.baseUrl + `auth/verifyResetCode`,
      data
    );
  }
  submitResetPassword(data: object): Observable<any> {
    return this.httpClient.put(
      environment.baseUrl + `auth/resetPassword`,
      data
    );
  }
getUserId(): string | null {
  const userData: any = this.decodeToken();
  console.log("Decoded token:", userData);

  if (!userData) return null;


  return userData.id || userData._id || userData.userId || userData.sub || null;
}
}
