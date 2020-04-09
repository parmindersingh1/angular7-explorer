import { AuthenticationService } from "./../services/authentication.service";
import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  CanActivateChild,
} from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private _router: Router,
    private _authService: AuthenticationService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    if (this._authService.isAuthenticated()) {
      // logged in so return true
      console.log("AUTHENTICATEDDD");
      return true;
    }
    // error when verify so redirect to login page with the return url
    this._router.navigate(["/login"], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | import("@angular/router").UrlTree
    | Observable<boolean | import("@angular/router").UrlTree>
    | Promise<boolean | import("@angular/router").UrlTree> {
    if (this._authService.isAuthenticated()) {
      // logged in so return true
      console.log("AUTHENTICATEDDD");
      return true;
    }
    // error when verify so redirect to login page with the return url
    this._router.navigate(["/login"], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }
}
