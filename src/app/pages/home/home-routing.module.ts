import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FeaturedComponent } from './featured/featured.component';


const routes: Routes = [
  {
    path: '',
    // component: AppLayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'featured',
        component: FeaturedComponent
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
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
