import {
  Component,
  OnInit,
  Output,
  Input,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ViewChild,
  AfterContentInit
} from "@angular/core";
import { Listing } from "../../../../models/Listing";
import { ListingDetailComponent } from "../listing-detail/listing-detail.component";
import { map, filter, take, switchMap } from "rxjs/operators";
import { LazyLoadScriptService } from "src/app/services/lazy-load-script.service";
declare const $: any;

@Component({
  selector: "app-listing",
  templateUrl: "./listing.component.html",
  styleUrls: ["./listing.component.css"]
})
export class ListingComponent implements OnInit, OnChanges, AfterContentInit {
  @Input() listings: Listing[] = [];
  @Input() listing_id: number;
  @Output() onListingChange = new EventEmitter<number>();
  @ViewChild("childCmp", { static: true })
  listDetailCmp: ListingDetailComponent;

  compressed: boolean;

  constructor(private lazyLoadService: LazyLoadScriptService) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {}

  ngAfterContentInit() {

      this.lazyLoadService.loadScript('assets/js/jquery.js')
      .pipe(
        map(_ => 'jQuery is loaded'),
        filter(jquery => !!jquery),
        take(1),
        switchMap(_ => this.lazyLoadService.loadScript('assets/js/jquery.trackpad-scroll-emulator.min.js')),
      )
      .subscribe(_ => {
        $(".map-results-list").TrackpadScrollEmulator();

      });
  }

  toggleResults() {
    this.compressed ? (this.compressed = false) : (this.compressed = true);
  }

  changeListing(listing_id: number) {
    if (this.listing_id !== listing_id) {
      this.listing_id = listing_id;
      this.onListingChange.emit(listing_id);
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
