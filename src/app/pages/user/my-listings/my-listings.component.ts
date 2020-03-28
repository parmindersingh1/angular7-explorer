import { Component, OnInit } from "@angular/core";
import { Listing } from "src/app/models/Listing";
import { ListingService } from "src/app/services/listing.service";
import { environment } from "src/environments/environment";
import { HelperService } from "src/app/helpers/helper.service";

@Component({
  selector: "app-my-listings",
  templateUrl: "./my-listings.component.html",
  styleUrls: ["./my-listings.component.css"]
})
export class MyListingsComponent implements OnInit {
  listings: Listing[] = [];
  activePage: number = 1;
  totalRecords: number = 15;
  recordsPerPage: number = 5;

  constructor(
    private listingService: ListingService,
    private helper: HelperService
  ) {
    this.getData();
  }

  ngOnInit() {}

  getData() {
    this.listingService
      .getUserListings(this.activePage)
      .subscribe((response: any) => {
        console.log("response", response);
        this.handleData(response);
      });
  }

  deleteListing(listing: Listing) {
    this.listingService.removeListing(listing.id).subscribe((response: any) => {
      console.log("response", response);
      this.getData();
    });
  }

  displayActivePage(activePageNumber: number) {
    console.log(activePageNumber);
    this.activePage = activePageNumber;
    this.getData();
  }

  getUrl(listing: Listing) {
    if (!listing.images || listing.images.length == 0) {
      return `assets/img/tmp/listing-${this.helper.generateRandom()}.jpg`;
    } else {
      return environment.baseUrl + listing.images[0];
    }
  }

  private handleData(response) {
    this.listings = response.data;
    console.log(response);
    this.listings.forEach((listing: Listing) => {
      listing.thumbnail = this.getUrl(listing);
      listing.address = `${listing.addressLineOne} ${listing.addressLineTwo}`;
    });
    this.activePage = response.current_page;
    this.totalRecords = response.total;
    this.recordsPerPage = response.per_page;
  }
}
