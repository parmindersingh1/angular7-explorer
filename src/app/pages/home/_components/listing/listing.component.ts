import {
  Component,
  OnInit,
  Output,
  Input,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ViewChild
} from "@angular/core";
import { Listing } from "../../../../models/Listing";
import { ListingDetailComponent } from '../listing-detail/listing-detail.component';

declare const $: any;

@Component({
  selector: "app-listing",
  templateUrl: "./listing.component.html",
  styleUrls: ["./listing.component.css"]
})
export class ListingComponent implements OnInit, OnChanges {
  @Input() listings: Listing[] = [];
  @Input() listing_id: number;
  @Output() onListingChange = new EventEmitter<number>();
  @ViewChild("childCmp", {static: true}) listDetailCmp: ListingDetailComponent;

  compressed: boolean;

  ngOnInit() {
    $(".map-results-list").TrackpadScrollEmulator();
  }

  ngOnChanges(changes: SimpleChanges) {}

  toggleResults() {
    this.compressed ? (this.compressed = false) : (this.compressed = true);
  }

  changeListing(listing_id: number) {
    if (this.listing_id !== listing_id) {
      this.listing_id = listing_id;
      this.onListingChange.emit(listing_id);
      console.log("Listing");
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
