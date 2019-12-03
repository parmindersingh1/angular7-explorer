import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ValidationService } from 'src/app/helpers/validation.service';

@Component({
  selector: 'profile-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  profileForm: FormGroup;
  @Output('onSubmit') submitData = new EventEmitter();

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      first_name: ["", [Validators.required]],
      last_name: ["", [Validators.required]],
      email: ["", [Validators.required, ValidationService.emailValidator]],
      phone: ["", [Validators.required]]
    });
  }

  get f() {
    return this.profileForm.controls;
  }

  ngOnInit() {}

  onSubmit() {
    this.submitData.emit(this.profileForm.value);
  }

  patchData(profileData) {
    this.profileForm.patchValue({
      ...profileData,
      profile: profileData.profile || {},
      social_accounts: profileData.social_accounts || []
    });
  }
}
