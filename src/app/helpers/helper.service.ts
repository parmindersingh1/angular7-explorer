import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class HelperService {
  public generateRandom(min = 1, max = 20) {
    return Math.floor(Math.random() * (+max - +min)) + +min;
  }
}
