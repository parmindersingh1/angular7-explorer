import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { ProfileService } from "src/app/pages/profile/_services/profile.service";
import { User } from "src/app/models/user";
import { AuthenticationService } from "src/app/services/authentication.service";
import { environment } from "src/environments/environment";
import { UserFormComponent } from "../_components/user-form/user-form.component";
import { SocialFormComponent } from "../_components/social-form/social-form.component";
import { AddressFormComponent } from "../_components/address-form/address-form.component";
import { Subscription } from "rxjs";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit, OnDestroy {
  profileData: any;
  currentUser: User = null;
  userSubscription: Subscription = null;
  file: File;
  fileUrl: any = "assets/img/demo_user.png";
  @ViewChild("fileInput", { static: true }) fileImportInput: any;
  @ViewChild("userCmp", { static: true }) userCmp: UserFormComponent;
  @ViewChild("addressCmp", { static: true }) addressCmp: AddressFormComponent;
  @ViewChild("socialCmp", { static: true }) socialCmp: SocialFormComponent;

  constructor(
    private auth: AuthenticationService,
    private _profileService: ProfileService,
    private logger: ToastrService
  ) {
    this.getProfile();
  }

  ngOnInit() {
    this.subscribeUser();
  }

  getProfile() {
    this._profileService.getProfile().subscribe(response => {
      this.profileData = response;
      console.log("profileData", this.profileData);
      this.userCmp.patchData(this.profileData);
      this.addressCmp.patchData(this.profileData);
      this.socialCmp.patchData(this.profileData);
      this.fileUrl = this.profileData.image
        ? environment.baseUrl + this.profileData.image || this.fileUrl
        : this.fileUrl;
    });
  }

  onFileChanged(event) {
    let file = event.target.files[0];
    this.file = file;
    console.log(file);
    if (!file) return;

    var reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      // $('#imgLogo').attr('src', e.target.result);
      this.fileUrl = e.target.result ? e.target.result : "";
      this.onSaveImage();
    };
    reader.readAsDataURL(file);
  }

  onSaveImage() {
    let fd = new FormData();
    if (this.file) fd.append("file", this.file);
    console.log(fd.has("file"));
    this._profileService.onSaveImage(fd).subscribe(
      response => {
        console.log("onSaveImage", response);
        this.logger.success("Image saved successfully");
      },
      error => {
        this.handleError(error);
      }
    );
  }

  onUserSave(formData) {
    console.log("onUserSave", formData);
    this._profileService.onSaveUser(formData).subscribe(
      response => {
        console.log("onUserSave", response);
        this.logger.success("Data saved successfully");
      },
      error => {
        this.handleError(error);
      }
    );
  }

  onProfileSave(formData) {
    console.log("onProfileSav", formData);
    this._profileService.onSaveProfile(formData).subscribe(
      response => {
        console.log("onProfileSav", response);
        this.logger.success("Data saved successfully");
      },
      error => {
        this.handleError(error);
      }
    );
  }

  onSocialSave(formData) {
    console.log("onSocialSave", formData);
    this._profileService.onSaveSocial(formData).subscribe(
      response => {
        console.log("onSocialSave", response);
        this.logger.success("Data saved successfully");
      },
      error => {
        this.handleError(error);
      }
    );
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  private subscribeUser() {
    this.userSubscription = this.auth.userEmitter.subscribe(user => {
      this.currentUser = user;
    });
  }

  private fileReset() {
    this.fileImportInput.nativeElement.value = "";
  }

  private handleError(err) {
    console.log("err", err);
    this.logger.error("Something went wrong", "Error");
  }
}
