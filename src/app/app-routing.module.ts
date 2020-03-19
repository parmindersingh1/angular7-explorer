import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppLayoutComponent } from './layouts/app-layout.component';

const routes: Routes = [
  {
    path: '',
    // component: AppLayoutComponent,
    // canActivateChild: [AuthGuard],
    children:[
      {
        path: 'app',
        component: AppLayoutComponent,
        children: [
          {
            path: 'home',
            loadChildren: './pages/home/home.module#HomeModule'
          },
          {
            path: 'profile',
            loadChildren: './pages/profile/profile.module#ProfileModule'
          },
          {
            path: 'listing',
            loadChildren: './pages/listing/listing.module#ListingModule'
          },
          {
            path: 'user',
            loadChildren: './pages/user/user.module#UserModule'
          },
          {
            path: '**',
            redirectTo: '/app/home'
          }
        ]

      },
      {
        path: 'auth',
        loadChildren: './auth/auth.module#AuthModule'
      },
      {
        path: 'admin',
        loadChildren: './admin/admin.module#AdminModule'
      },
      {
        path: '**',
        redirectTo: '/app/home'
      }
    ]

  },
  {
    path: '**',
    redirectTo: '/app/home'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
