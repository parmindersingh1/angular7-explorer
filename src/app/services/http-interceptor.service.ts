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
    this.loaderService.displayLoader(true);
    console.log("interceptor running");

    // Get the token from auth service.
    const authToken = this.auth.getToken();
    if (authToken) {
      // Clone the request to add the new header.
      const authReq = req.clone({
        headers: req.headers.set("Authorization", `Bearer ${authToken}`)
      });
      console.log("interceptor running with new         headers");

      // send the newly created request
      return next.handle(authReq).pipe(
        tap(
          (event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              this.loaderService.displayLoader(false);
              // Response wiht HttpResponse type
              console.log("TAP function", event);
            }
          },
          (err: any) => {
            console.log("interceptor", err);
            if (err instanceof HttpErrorResponse) {
              if (err.status === 401) {
                this.logger.error(err.error);
                this.loaderService.displayLoader(false);
                localStorage.removeItem("token");
                this.router.navigate(["/"]);
              }
            }
          }
        )
      );
    } else {
      console.log("interceptor without changes");
      return next.handle(req);
    }
  }
}
