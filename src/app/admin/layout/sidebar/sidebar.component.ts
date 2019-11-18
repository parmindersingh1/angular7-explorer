import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: '.admin-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AdminSidebarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
