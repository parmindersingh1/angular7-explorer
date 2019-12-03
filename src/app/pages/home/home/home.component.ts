import { ScriptLoaderService } from "../../../services/script-loader.service";
import {
  Component,
  OnInit,
  ViewEncapsulation,
  AfterViewInit,
  ChangeDetectorRef
} from "@angular/core";
import { Listing } from "src/app/models/Listing";
import { ListingService } from "../../../services/listing.service";
declare var $: any;

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent {
  listings: Listing[] = [];
  listing_id: number;

  constructor(private cd: ChangeDetectorRef, listingService: ListingService) {
    listingService
      .getListings()
      .subscribe((listings: any) => (this.listings = listings));
  }

  setListing(listing_id: number) {
    this.listing_id = listing_id;
    this.cd.detectChanges();
  }
}
