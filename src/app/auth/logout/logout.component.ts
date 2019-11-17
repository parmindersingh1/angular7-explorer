import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private _router: AuthenticationService,
    private _authService: AuthenticationService) {
}

ngOnInit(): void {
    // Helpers.setLoading(true);
    // reset login status
    this._authService.onLogout();
}

}
