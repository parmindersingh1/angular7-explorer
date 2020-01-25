import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { environment } from "src/environments/environment";
import { tap, map, filter, catchError } from "rxjs/operators";
import { Listing } from "../models/Listing";
import { throwError } from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

@Injectable({
  providedIn: "root"
})
export class ListingService {
  constructor(private http: HttpClient) {}

  getListings(page = 1) {
    return this.http
      .get(`${environment.apiUrl}/listings`, {
        params: {
          page: page.toString()
        }
      })
      .pipe(
        map(res => res),
        catchError(error => this.handleError(error))
      );
  }

  getListing(listing_id) {
    return this.http.get(`${environment.apiUrl}/listings/${listing_id}`).pipe(
      map(res => res),
      catchError(error => this.handleError(error))
    );
  }

  getCategories() {
    return this.http.get(`${environment.apiUrl}/categories`).pipe(
      map(res => res),
      catchError(error => this.handleError(error))
    );
  }

  saveListing(listing: Listing) {
    const headers = new HttpHeaders();
    headers.append("Content-Type", "multipart/form-data");
    headers.append("Accept", "application/json");

    return this.http
      .post(`${environment.apiUrl}/listings`, listing, { headers })
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError(error => this.handleError(error))
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side error.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend error.
      return throwError(error);
    }
    // return a custom error message
    return throwError(
      "Ohps something wrong happen here; please try again later."
    );
  }
}
