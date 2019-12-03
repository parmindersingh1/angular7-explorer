import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { map, catchError } from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

@Injectable({
  providedIn: "root"
})
export class ProfileService {
  constructor(private http: HttpClient, private router: Router) {}

  onChangePassword(data): Observable<any> {
    const request = JSON.stringify(data);

    return this.http
      .post(
        `${environment.apiUrl}/profile/change-password`,
        request,
        httpOptions
      )
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(error => this.handleError(error))
      );
  }

  onSaveImage(data): Observable<any> {
    // const request = JSON.stringify(data);
    const headers = new HttpHeaders();
    headers.append("Content-Type", "multipart/form-data");
    headers.append("Accept", "application/json");

    return this.http
      .post(`${environment.apiUrl}/profile/save-image`, data, { headers })
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(error => this.handleError(error))
      );
  }

  onSaveUser(data): Observable<any> {
    const request = JSON.stringify(data);

    return this.http
      .post(
        `${environment.apiUrl}/profile/save-user`,
        request,
        httpOptions
      )
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(error => this.handleError(error))
      );
  }

  onSaveProfile(data): Observable<any> {
    const request = JSON.stringify(data);

    return this.http
      .post(
        `${environment.apiUrl}/profile/save-profile`,
        request,
        httpOptions
      )
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(error => this.handleError(error))
      );
  }

  onSaveSocial(data): Observable<any> {
    const request = JSON.stringify(data);

    return this.http
      .post(
        `${environment.apiUrl}/profile/save-social`,
        request,
        httpOptions
      )
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(error => this.handleError(error))
      );
  }

  getProfile(): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}/profile/profile`, httpOptions)
      .pipe(
        map((response: any) => {
          return response;
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
