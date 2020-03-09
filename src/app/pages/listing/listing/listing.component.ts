import { Component, OnInit } from "@angular/core";
import { ListingService } from "src/app/services/listing.service";
import { Listing } from "src/app/models/Listing";
import { HelperService } from 'src/app/helpers/helper.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: "app-listing",
  templateUrl: "./listing.component.html",
  styleUrls: ["./listing.component.css"]
})
export class ListingComponent implements OnInit {
  listings: Listing[] = [];
  activePage: number = 1;
  totalRecords: number = 15;
  recordsPerPage: number = 5;

  constructor(
    private listingService: ListingService,
    private helper: HelperService
  ) {
    this.getData(this.activePage);
  }

  ngOnInit() {}

  getData(page: number) {
    this.listingService.getListings(page).subscribe((response: any) => {
      this.listings = response.data;
      console.log(response);
      this.listings.forEach((listing: Listing) => {
        listing.thumbnail = this.getUrl(listing);
      });
      this.activePage = response.current_page;
      this.totalRecords = response.total;
      this.recordsPerPage = response.per_page;
    });
  }

  displayActivePage(activePageNumber: number) {
    this.activePage = activePageNumber;
    this.getData(this.activePage);
  }

  getAddress(listing) {
    if (!listing) return "";
    return `${listing.addressLineOne} ${listing.city} ${listing.state}`;
  }

  getUrl(listing: Listing) {
    if (!listing.images || listing.images.length == 0) {
      return `assets/img/tmp/listing-${this.helper.generateRandom()}.jpg`;
    } else {
      return environment.baseUrl + listing.images[0];
    }
  }

  buildRating(rating) {
    let template = "";

    for (let i = 0; i < rating; i++) {
      template += '<i class="fa fa-star"></i>';
    }

    for (let i = rating; i < 5; i++) {
      template += '<i class="fa fa-star-o"></i>';
    }

    return template;
  }
}
