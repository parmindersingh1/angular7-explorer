import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
  selector: '.admin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AdminHeaderComponent implements OnInit {

  constructor(private router: Router) {

  }

  ngOnInit() {
  }


}
