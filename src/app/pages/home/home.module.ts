import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { MapComponent } from './_components/map/map.component';
import { ListingComponent } from './_components/listing/listing.component';
import { ListingDetailComponent } from './_components/listing-detail/listing-detail.component';
import { SharedModule } from '../../shared/shared.module';
import { FeaturedComponent } from './featured/featured.component';


@NgModule({
  declarations: [
    HomeComponent,
    MapComponent,
    ListingComponent,
    ListingDetailComponent,
    FeaturedComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
