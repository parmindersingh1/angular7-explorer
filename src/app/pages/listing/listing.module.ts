import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListingRoutingModule } from './listing-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NewComponent } from './new/new.component';


@NgModule({
  declarations: [NewComponent],
  imports: [
    CommonModule,
    SharedModule,
    ListingRoutingModule
  ]
})
export class ListingModule { }
