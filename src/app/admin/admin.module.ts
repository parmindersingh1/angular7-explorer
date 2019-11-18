import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { AdminLayoutComponent } from './layout/admin-layout.component';
import { AdminSidebarComponent } from './layout/sidebar/sidebar.component';
import { AdminHeaderComponent } from './layout/header/header.component';
import { AdminFooterComponent } from './layout/footer/footer.component';

@NgModule({
  declarations: [DashboardComponent, AdminLayoutComponent, AdminSidebarComponent, AdminHeaderComponent, AdminFooterComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
