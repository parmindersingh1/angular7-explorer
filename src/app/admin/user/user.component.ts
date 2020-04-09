import { Component, OnInit, ViewChild } from "@angular/core";
import { environment } from "src/environments/environment";
import { Listing } from "src/app/models/Listing";
import { HelperService } from "src/app/helpers/helper.service";
import { AdminService } from "../_services/AdminService";
import { User } from "src/app/models/user";
import { ModalBasicComponent } from "src/app/shared/components/modal-basic/modal-basic.component";
import { NgForm } from "@angular/forms";
import { ProfileService } from "src/app/pages/profile/_services/profile.service";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent implements OnInit {
  users: User[] = [];
  activePage: number = 1;
  totalRecords: number = 15;
  recordsPerPage: number = 5;
  @ViewChild("userModal", { static: true }) userModal: ModalBasicComponent;
  model: User;

  constructor(
    private _adminService: AdminService,
    private helper: HelperService,
    private _profileService: ProfileService,
    private logger: ToastrService
  ) {
    this.getData();
  }

  ngOnInit() {}

  getData() {
    this._adminService
      .getUsers(this.activePage, {})
      .subscribe((response: any) => {
        this.handleData(response);
      });
  }

  deleteListing(listing: Listing) {
    this._adminService.removeListing(listing.id).subscribe((response: any) => {
      console.log("response", response);
      this.getData();
    });
  }

  displayActivePage(activePageNumber: number) {
    console.log(activePageNumber);
    this.activePage = activePageNumber;
    this.getData();
  }

  getUrl(user: User) {
    // if (!user.images || user.images.length == 0) {
    //   return `assets/img/tmp/listing-${this.helper.generateRandom()}.jpg`;
    // } else {
    //   return environment.baseUrl + user.images[0];
    // }
  }

  onEditUser(form: NgForm) {
    console.log("form", form.value);
    if (form.valid) {
      this._profileService.onSaveUser(form.value).subscribe((response) => {
        console.log("onSaveUser", response);
        this.logger.success("User saved successfully");
        this.hideModal();
      });
    } else {
      this.logger.error("Invalid Data");
    }
  }

  displayUserForm(user: User) {
    this.model = user;
    this.userModal.show();
  }

  hideModal() {
    this.userModal.hide();
  }

  private handleData(response) {
    this.users = response.data;
    // console.log(response);
    // this.users.forEach((listing: Listing) => {
    //   listing.thumbnail = this.getUrl(listing);
    //   listing.address = `${listing.addressLineOne} ${listing.addressLineTwo}`;
    // });
    this.activePage = response.current_page;
    this.totalRecords = response.total;
    this.recordsPerPage = response.per_page;
  }
}
