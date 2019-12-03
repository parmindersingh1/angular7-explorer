import {
  Component,
  OnInit,
  OnChanges,
  Input,
  Output,
  EventEmitter
} from "@angular/core";
import { trigger, state, style } from "@angular/animations";
import { Listing } from "../../../../models/Listing";
import { ListingService } from "../../../../services/listing.service";

@Component({
  selector: "app-listing-detail",
  templateUrl: "./listing-detail.component.html",
  styleUrls: ["./listing-detail.component.css"],
  animations: [
    trigger("stateChanged", [
      state(
        "closed",
        style({
          "z-index": "99",
          transform: "translateX(-100%)"
        })
      ),
      state(
        "open",
        style({
          "z-index": "99",
          transform: "translateX(0)"
        })
      )
    ])
  ]
})
export class ListingDetailComponent implements OnInit, OnChanges {
  @Input() listing_id: number;
  @Output() onListingChange = new EventEmitter<number>();

  state: string;
  listing: Listing;

  constructor(private listingService: ListingService) {
    this.listingService = listingService;
    this.state = "closed";
  }

  ngOnInit() {}

  ngOnChanges(changes: any) {
    if ("listing_id" in changes) {
      console.log("changes");
      if (
        changes.listing_id.currentValue !== undefined &&
        changes.listing_id.currentValue !== null
      ) {
        this.fetch();
      }
    }
  }


  fetch() {
    this.listingService
      .getListing(this.listing_id)
      .subscribe((listing: any) => {
        this.listing = listing;
        this.state = "open";
      });
  }

  close() {
    this.listing = null;
    this.state = "closed";
    this.onListingChange.emit(null);
  }

  getAddress(listing) {
    if (!listing) return "";
    return `${listing.address_line1} ${listing.city} ${listing.state}`;
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
