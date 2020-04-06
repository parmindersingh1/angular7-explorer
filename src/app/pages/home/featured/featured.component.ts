import {
  Component,
  ViewEncapsulation,
  ChangeDetectorRef,
  OnInit,
  AfterContentInit
} from "@angular/core";
import { Listing } from "src/app/models/Listing";
import { ListingService } from "../../../services/listing.service";
import { HelperService } from "src/app/helpers/helper.service";
import { environment } from "src/environments/environment";
import { LazyLoadScriptService } from "src/app/services/lazy-load-script.service";
import { map, filter, take, switchMap } from "rxjs/operators";
import { Category } from "src/app/models/Category";

declare var $: any;

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.css']
})
export class FeaturedComponent implements OnInit, AfterContentInit {
  listings: Listing[] = [];
  listing_id: number;
  locations: any[] = [];
  categories: Category[] = [];

  constructor(
    private cd: ChangeDetectorRef,
    private listingService: ListingService,
    private helper: HelperService,
    private lazyLoadService: LazyLoadScriptService
  ) {
    listingService.getListings(1, {}).subscribe((response: any) => {
      this.handleData(response);
    });

    listingService.getCategories().subscribe((data: any[]) => {
      this.categories = data;
    });

    listingService.getLocations().subscribe((data: any[]) => {
      this.locations = data;
      console.log("locations", this.locations);
    });
  }

  ngOnInit() {}

  ngAfterContentInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
    // this.lazyLoadService.loadScript('assets/js/jquery.trackpad-scroll-emulator.min.js')
    // .pipe(
    //   map(_ => 'jQuery is loaded'),
    //   filter(jquery => !!jquery),
    //   take(1)
    // )
    // .subscribe(_ => {
    // });
  }

  onSearch(data) {
    this.listingService.searchListing(data, 1).subscribe(
      response => {
        console.log("search response", response);
        this.handleData(response);
      },
      err => {}
    );
  }

  getUrl(listing: Listing) {
    if (!listing.images || listing.images.length == 0) {
      return `assets/img/tmp/listing-${this.helper.generateRandom()}.jpg`;
    } else {
      return environment.baseUrl + listing.images[0];
    }
  }

  setListing(listing_id: number) {
    this.listing_id = listing_id;
    this.cd.detectChanges();
  }

  private handleData(response) {
    this.listings = response.data;
    this.listings.forEach((listing: Listing) => {
      listing.thumbnail = this.getUrl(listing);
    });
  }
}
