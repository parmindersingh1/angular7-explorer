import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { MyListingsComponent } from './my-listings/my-listings.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BookmarksComponent } from './bookmarks/bookmarks.component';


@NgModule({
  declarations: [MyListingsComponent, BookmarksComponent],
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule
  ]
})
export class UserModule { }
