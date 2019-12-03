import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap, map, filter } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ListingService {
  constructor(
    private http: HttpClient) { }

    getListings() {
      return this.http.get(`${environment.apiUrl}/listings`)
          .pipe(map(res => res));
    }

    getListing(listing_id) {
      return this.http.get(`${environment.apiUrl}/listings/${listing_id}`)
          .pipe(map(res => res));
    }

}
