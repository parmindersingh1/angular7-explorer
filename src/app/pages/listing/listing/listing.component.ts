import { Component, OnInit, OnDestroy } from "@angular/core";
import { ListingService } from "src/app/services/listing.service";
import { Listing } from "src/app/models/Listing";
import { HelperService } from "src/app/helpers/helper.service";
import { environment } from "src/environments/environment";
import { Category } from "src/app/models/Category";
import { NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-listing",
  templateUrl: "./listing.component.html",
  styleUrls: ["./listing.component.css"],
})
export class ListingComponent implements OnInit, OnDestroy {
  listings: Listing[] = [];
  locations: any[] = [];
  categories: Category[] = [];
  activePage: number = 1;
  totalRecords: number = 15;
  recordsPerPage: number = 5;
  public search: any = {
    location: "",
    category: "",
  };

  private sub: Subscription = null;

  constructor(
    private listingService: ListingService,
    private helper: HelperService,
    private _router: Router,
    private route: ActivatedRoute
  ) {
    this.getData();

    listingService.getCategories().subscribe((data: any[]) => {
      this.categories = data;
    });

    listingService.getLocations().subscribe((data: any[]) => {
      this.locations = data;
    });
  }

  ngOnInit() {
    this.sub = this.route.queryParams.subscribe((queryParams) => {
      this.search.category = queryParams["category"] || '';
      this.search.location = queryParams["location"] || '';

      this.getData();
    });
  }

  getData() {
    this.listingService
      .getListings(this.activePage, this.search)
      .subscribe((response: any) => {
        this.handleData(response);
      });
  }

  displayActivePage(activePageNumber: number) {
    this.activePage = activePageNumber;
    this.getData();
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

  onListingSearch() {
    // this.listingService.searchListing(this.search, this.activePage).subscribe(
    //   response => {
    //     console.log("search response", response);
    //     this.handleData(response);
    //   },
    //   err => {}
    // );
    // this.getData();
    this._router.navigate(["/app/listing/list"], {
      queryParams: { ...this.search },
    });
  }

  clearSearch() {
    this.search = {
      location: "",
      category: "",
    };

    this._router.navigate(["/app/listing/list"], {
      queryParams: { ...this.search },
    });
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

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private handleData(response) {
    this.listings = response.data;
    console.log("search", this.search);
    this.listings.forEach((listing: Listing) => {
      listing.thumbnail = this.getUrl(listing);
    });
    this.activePage = response.current_page;
    this.totalRecords = response.total;
    this.recordsPerPage = response.per_page;
  }
}
