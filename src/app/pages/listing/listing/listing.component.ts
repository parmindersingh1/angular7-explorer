import { Component, OnInit } from "@angular/core";
import { ListingService } from "src/app/services/listing.service";
import { Listing } from "src/app/models/Listing";

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

  constructor(private listingService: ListingService) {
    this.getData(this.activePage);
  }

  ngOnInit() {}

  getData(page: number) {
    this.listingService.getListings(page).subscribe((response: any) => {
      this.listings = response.data;
      console.log(response);
      this.activePage = response.current_page;
      this.totalRecords = response.total;
      this.recordsPerPage = response.per_page;
    });
  }

  displayActivePage(activePageNumber: number) {
    this.activePage = activePageNumber;
    this.getData(this.activePage);
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
