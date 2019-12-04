import { Component, OnInit, AfterContentInit } from "@angular/core";
import { ListingService } from "../../../services/listing.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "listing-new",
  templateUrl: "./new.component.html",
  styleUrls: ["./new.component.css"]
})
export class NewComponent implements OnInit {
  constructor(
    private _listingService: ListingService,
    private logger: ToastrService
  ) {}
  ngOnInit() {}

  onSubmit(formData: any) {
    console.log("formData", formData);
    this._listingService.saveListing(formData).subscribe(
      response => {
        console.log("onSubmit", response);
        this.logger.success("Data Saved Successfully");
      },
      error => {
        this.logger.error(error);
      }
    );
  }
}
