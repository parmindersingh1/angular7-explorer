import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddressFormComponent } from './_components/address-form/address-form.component';
import { UserFormComponent } from './_components/user-form/user-form.component';
import { SocialFormComponent } from './_components/social-form/social-form.component';


@NgModule({
  declarations: [
    ChangePasswordComponent,
    ProfileComponent,
    AddressFormComponent,
    UserFormComponent,
    SocialFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProfileRoutingModule,
  ]
})
export class ProfileModule { }
