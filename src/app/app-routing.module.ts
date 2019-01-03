import { LayoutsComponent } from './shared/layouts/layouts.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: LayoutsComponent,
    // canActivateChild: [AuthGuard],
    children: [      
      {
        path: 'home',
        component: HomeComponent
      },  
      {
        path: 'auth',
        loadChildren: './auth/auth.module#AuthModule'    
      },
      {
        path: '**',
        redirectTo: '/home'
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
