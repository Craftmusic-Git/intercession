import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AddressResponse } from "../src/model/address/address";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AddressApiService {
  readonly apiUrl = 'https://api-adresse.data.gouv.fr';

  http = inject(HttpClient);

  getPosition(address: string ) {
    return this.http.get(`${this.apiUrl}/search/?q=${address}+strasbourg&limit=1&format=json`);
  }

  constructor() { }

  searchAddress( query: string ): Observable<AddressResponse> {
    return this.http.get<AddressResponse>(`${this.apiUrl}/search/?q=${query}+strasbourg&limit=1&format=json&limit=5&type=housenumber`);
  }
}
