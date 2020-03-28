import { Component, OnInit } from '@angular/core';
import { Listing } from 'src/app/models/Listing';
import { ListingService } from 'src/app/services/listing.service';
import { HelperService } from 'src/app/helpers/helper.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent implements OnInit {

  listings: Listing[] = [];

  constructor(
    private listingService: ListingService,
    private helper: HelperService
  ) {
    this.getData();
  }

  ngOnInit() {}

  getData() {
    this.listingService
      .getBookmarks()
      .subscribe((response: any) => {
        console.log("response", response);
        this.handleData(response);
      });
  }

  deleteBookmark(listing: Listing) {
    this.listingService.removeBookmark(listing.id)
    .subscribe((response: any) => {
      console.log("response", response);
      this.getData();
    });
  }

  getUrl(listing: Listing) {
    if (!listing.images || listing.images.length == 0) {
      return `assets/img/tmp/listing-${this.helper.generateRandom()}.jpg`;
    } else {
      return environment.baseUrl + listing.images[0];
    }
  }

  private handleData(response) {
    this.listings = response;
    console.log(response);
    this.listings.forEach((listing: Listing) => {
      listing.thumbnail = this.getUrl(listing);
      listing.address = `${listing.addressLineOne} ${listing.addressLineTwo}`;
    });
  }

}
