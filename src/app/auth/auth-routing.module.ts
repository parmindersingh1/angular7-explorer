import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from '../layouts/app-layout.component';

const routes: Routes = [
  {
    path: '',
    // component: AppLayoutComponent,
    // canActivateChild: [AuthGuard],
    children: [      
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: '**',
        redirectTo: '/login'
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
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
