import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormArray, FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: "profile-social-form",
  templateUrl: "./social-form.component.html",
  styleUrls: ["./social-form.component.css"]
})
export class SocialFormComponent implements OnInit {
  profileForm: FormGroup;
  socialAccounts = ["facebook", "twitter", "linkedin", "dribbble", "instagram"];
  @Output("onSubmit") submitData = new EventEmitter();

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      // social_accounts: this.fb.group({
      //   facebook: [""],
      //   twitter: [""],
      //   linkedin: [""],
      //   dribbble: [""],
      //   instagram: [""]
      // })
      // social_accounts: this.fb.array(this.socialAccounts.map(() => ""))
      social_accounts: this.fb.array([])
    });
  }

  get f() {
    return this.profileForm.controls;
  }

  get socialArray(): FormArray {
    return <FormArray>this.profileForm.get("social_accounts");
  }
  ngOnInit() {}

  onSubmit() {
    this.submitData.emit(this.profileForm.value);
  }

  patchData(profileData) {
    let control = <FormArray>this.profileForm.controls.social_accounts;
    let socialData = profileData.social_accounts || [];
    console.log("social Data", socialData);

    // this.profileForm.patchValue({
    //   ...profileData,
    //   profile: profileData.profile || {},
    //   social_accounts: profileData.social_accounts || []
    // });

    this.socialAccounts.forEach(item => {
      control.push(
        this.fb.group({
          name: [item],
          link: [this.findByName(socialData, item)]
        })
      );
    });
  }

  private findByName(list: any[] = [], name: string) {
    let item = list.find(item => {
      return item.name === name;
    });

    return item ? item.link : "";
  }
}
