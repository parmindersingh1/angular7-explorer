import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { MyListingsComponent } from './my-listings/my-listings.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';


const routes: Routes = [
  {
    path: '',
    // component: AppLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'my-listings',
        component: MyListingsComponent
      },
      {
        path: 'my-bookmarks',
        component: BookmarksComponent
      },
      {
        path: '**',
        redirectTo: '/login'
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/app/user/my-listings'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
