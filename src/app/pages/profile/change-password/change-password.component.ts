import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/app/services/authentication.service";
import { ValidationService } from "src/app/helpers/validation.service";
import { ProfileService } from "src/app/pages/profile/_services/profile.service";
import { User } from "src/app/models/user";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.css"]
})
export class ChangePasswordComponent implements OnInit {
  error: any;
  changePasswordForm: FormGroup;
  currentUser: User = null;

  get f() {
    return this.changePasswordForm.controls;
  }

  constructor(
    private _router: Router,
    private _profileService: ProfileService,
    private fb: FormBuilder,
    private logger: ToastrService,
    private auth: AuthenticationService
  ) {
    this.changePasswordForm = this.fb.group({
      password: ["", [Validators.required, Validators.minLength(6)]],
      password_confirmation: [
        "",
        [Validators.required, ValidationService.matchValues("password")]
      ],
      id: [this.currentUser ? this.currentUser.id : ""]
    });
    this.subscribeUser();
  }

  ngOnInit() {
    // this.model.remember = true;
    // get return url from route parameters or default to '/'
    // this._router.navigate([this.returnUrl]);
    // this._script.loadScripts('body', [
    //     'assets/vendors/base/vendors.bundle.js',
    //     // 'assets/demo/default/base/scripts.bundle.js'
    //     ], true).then(() => {
    //         Helpers.setLoading(false);
    //         LoginCustom.init();
    //     });
  }

  onSubmit() {
    console.log(this.changePasswordForm);
    if (this.changePasswordForm.dirty && this.changePasswordForm.valid) {
      this._profileService
        .onChangePassword(this.changePasswordForm.value)
        .subscribe(
          response => {
            // get return url from route parameters or default to '/'
            this.logger.success("Password changed successfully");
            this._router.navigate(["/"]);
            this.changePasswordForm.reset();
          },
          error => {
            this.error = error.error;
            this.logger.error("Something went wrong", "Error");
          }
        );
      // Clear form fields
    }
  }

  subscribeUser() {
    this.auth.userEmitter.subscribe(user => {
      this.currentUser = user;
      if (this.currentUser)
        this.changePasswordForm.get("id").setValue(this.currentUser.id);
    });
  }
}
