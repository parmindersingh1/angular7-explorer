import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: "profile-address-form",
  templateUrl: "./address-form.component.html",
  styleUrls: ["./address-form.component.css"]
})
export class AddressFormComponent implements OnInit {
  profileForm: FormGroup;
  @Output('onSubmit') submitData = new EventEmitter();

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      addressLineOne: ["", [Validators.required]],
      addressLineTwo: [""],
      city: ["", [Validators.required]],
      state: ["", [Validators.required]],
      country: ["Canada", [Validators.required]],
      pincode: ["", [Validators.required]],
      bio: [""]
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
    console.log("........",{
      ...(profileData.profile || {})
    });
    this.profileForm.patchValue({
      ...(profileData.profile || {})
    });
  }


}
