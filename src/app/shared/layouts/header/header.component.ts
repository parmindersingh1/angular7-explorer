import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  headerClass: string;

  constructor(private router: Router) {
    router.events.forEach((event) => {
      if(event instanceof NavigationEnd) {
        this.changeHeader();
      }
      // NavigationEnd
      // NavigationCancel
      // NavigationError
      // RoutesRecognized
    });
   }

  ngOnInit() {
  }
  changeHeader() {
    console.log("current url", this.router.url);
    if(this.router.url == '/home')
      this.headerClass = 'header-transparent header-light';
    else
      this.headerClass = '';

  }

}
