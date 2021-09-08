import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  /**
   * Get access token
   */
  // public getAccessToken = (): Observable<string | null> => of(localStorage.getItem('accessToken')); // accessToken
  public getAccessToken = (): string | null =>
    localStorage.getItem('accessToken'); // accessToken

  /**
   * Get refresh token
   */
  public getRefreshToken = (): string | null =>
    localStorage.getItem('refreshToken');

  /**
   * Set access token
   */
  public setAccessToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  /**
   * Set refresh token
   */
  public setRefreshToken(token: string) {
    localStorage.setItem('refreshToken', token);
  }

  /**
   * Remove tokens
   */
  public clear() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
}
