import { HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

// import { Observable, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';

// import { environment } from '../../environments/environment';
import { TokenStorageService } from './token-storage.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
// import { User } from 'app/core/models/user';

interface AccessData {
  access_token: string;
  refresh_token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private urlApi: string = environment.apiUrl;
  // private refreshTokenTimeout;
  // private systemParams: Parameter[];
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private tokenStorage: TokenStorageService
  ) {
    this.urlApi = environment.apiUrl;
  }

  isAuthorized = (): boolean => {
    const token = this.tokenStorage.getAccessToken();
    const isAuthorized = !!token && !this.isTokenExpired(token);
    if (!isAuthorized) this.logout();
    return isAuthorized;
  };

  login(email: string, password: string) {
    return this.httpClient
      .post(`${this.urlApi}/auth/login`, { username: email, password })
      .pipe(
        tap((tokens: any) => {
          this.saveAccessData(tokens);
          // this.startRefreshTokenTimer();
        }),
        map((tokens) =>
          !tokens.access ? tokens : this.deserializeToken(tokens.access)
        )
      );
  }

  /**
   * Logout
   */
  logout(): void {
    // this.stopRefreshTokenTimer();
    this.tokenStorage.clear();
  }

  verifyTokenRequest = () => false;

  getSessionTime() {
    const token = this.tokenStorage.getAccessToken();
    if (token)
      return (
        this.deserializeToken(token)['exp'] -
        this.deserializeToken(token)['iat']
      );
    return null;
  }

  private deserializeToken(token: string) {
    const [, body] = token.split('.');
    // decoding base64 ⇢ UTF8
    return JSON.parse(
      decodeURIComponent(
        atob(body)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      )
    );
  }

  private isTokenExpired(token: string) {
    const exp: number = this.deserializeToken(token).exp;
    const expired = exp - Date.now() / 1000 <= 0;
    return expired;
  }

  /**
   * Save access data in the storage
   */
  private saveAccessData(tokens: AccessData) {
    this.tokenStorage.setAccessToken(tokens.access_token);
    if (tokens.refresh_token)
      this.tokenStorage.setRefreshToken(tokens.refresh_token);
  }
}
