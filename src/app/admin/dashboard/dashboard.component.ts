import { Component, OnInit } from '@angular/core';
import {AdminService} from './../_services/AdminService';
import { environment } from 'src/environments/environment';
import { HelperService } from 'src/app/helpers/helper.service';
import { Listing } from 'src/app/models/Listing';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dashboardData: any = {};

  constructor(private _adminService: AdminService, private helper: HelperService,) {
    this._adminService.getDashboardData().subscribe(response=> {
      console.log("dashboad", response);
      this.dashboardData = response;

      this.dashboardData.latestListings.forEach((listing: Listing) => {
        listing.thumbnail = this.getUrl(listing);
      });
    })
  }

  ngOnInit() {
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
