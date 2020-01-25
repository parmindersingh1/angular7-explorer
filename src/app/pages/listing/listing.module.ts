import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListingRoutingModule } from './listing-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NewComponent } from './new/new.component';
import { ListingFormComponent } from './_components/listing-form/listing-form.component';
import { ListingComponent } from './listing/listing.component';


@NgModule({
  declarations: [NewComponent, ListingFormComponent, ListingComponent],
  imports: [
    CommonModule,
    SharedModule,
    ListingRoutingModule
  ]
})
export class ListingModule { }
