import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/user';

@Component({
  selector: '.admin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AdminHeaderComponent implements OnInit {

  headerClass: string;
  currentUser: User = null;

  get imageUrl() {
    return `url('${environment.baseUrl + this.currentUser.image}')`;
  }

  constructor(private router: Router, public auth: AuthenticationService) {
    this.subscribeUser();
  }

  ngOnInit() {
    this.auth.getUser().subscribe();
  }

  full_name() {
    return this.currentUser
      ? this.currentUser.first_name + " " + this.currentUser.last_name
      : "";
  }

  subscribeUser() {
    this.auth.userEmitter.subscribe((user: User) => {
      console.log("header", user);
      this.currentUser = user;
    });
  }

  onLogout() {
    this.auth.onLogout().subscribe();
  }


}
