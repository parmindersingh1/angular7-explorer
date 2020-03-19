import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpHeaders,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpResponse
} from "@angular/common/http";
import { AuthenticationService } from "./authentication.service";
import { LoaderService } from "./loader.service";
import { ToastrService } from "ngx-toastr";

// App import
@Injectable({
  providedIn: "root"
})
export class AppHttpInterceptorService implements HttpInterceptor {
  constructor(
    public auth: AuthenticationService,
    private router: Router,
    private loaderService: LoaderService,
    private logger: ToastrService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // this.loaderService.displayLoader(true);

    // Get the token from auth service.
    const authToken = this.auth.getToken();
    if (authToken) {
      // Clone the request to add the new header.
      const authReq = req.clone({
        headers: req.headers.set("Authorization", `Bearer ${authToken}`)
      });

      // send the newly created request
      return next.handle(authReq).pipe(
        tap(
          (event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              // this.loaderService.displayLoader(false);
              // Response wiht HttpResponse type
            }
          },
          (err: any) => {
            if (err instanceof HttpErrorResponse) {
              if (err.status === 401) {
                this.logger.error(err.error);
                localStorage.removeItem("token");
                console.log("UNAUTHHHHH");
                // this.loaderService.displayLoader(false);
                this.router.navigate(["/"]);
              }
              // this.loaderService.displayLoader(false);
            }
            // this.loaderService.displayLoader(false);
            return next.handle(req);
          }
        )
      );
    } else {
      return next.handle(req);
      // this.loaderService.displayLoader(false);
    }
  }
}
