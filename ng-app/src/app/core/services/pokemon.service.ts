import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BaseEntityService } from './base-entity.service';
import { environment } from '../../../environments/environment';
import { Pokemon } from '../models/pokemon';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class PokemonService extends BaseEntityService<Pokemon> {
  constructor(protected http: HttpClient) {
    super(http);
    this.entityUrl = 'pokemon';
  }
}
