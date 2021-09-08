import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseEntityService<T> {
  protected apiUrl: string;
  protected entityUrl: string;
  protected headers = new HttpHeaders();
  constructor(protected http: HttpClient) {
    this.entityUrl = '';
    this.apiUrl = `${environment.apiUrl}`;
  }
  getAll(searchField?: string, searchValue?: string): Observable<T[]> {
    if (searchField && searchValue) {
      let params = new HttpParams().append(searchField, searchValue);
      return this.http.get<T[]>(`${this.apiUrl}/${this.entityUrl}/`, {
        headers: this.headers,
        params,
      });
    }
    return this.http.get<T[]>(`${this.apiUrl}/${this.entityUrl}/`, {
      headers: this.headers,
    });
  }
  get(id: number): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${this.entityUrl}/${id}/`, {
      headers: this.headers,
    });
  }
  update(id: number, entity: any): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${this.entityUrl}/${id}/`, entity, {
      headers: this.headers,
    });
  }
  add(entity: T) {
    return this.http.post<T>(`${this.apiUrl}/${this.entityUrl}/`, entity, {
      headers: this.headers,
    });
  }
  delete(id: string): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}/${this.entityUrl}/${id}/`, {
      headers: this.headers,
    });
  }
  fullUrl() {
    return `${this.apiUrl}/${this.entityUrl}/`;
  }
}
