import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminLayoutComponent } from './layout/admin-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    // canActivateChild: [AuthGuard],
    children: [      
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: '**',
        redirectTo: '/admin/dashboard'
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
