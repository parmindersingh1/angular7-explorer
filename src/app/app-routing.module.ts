import { HomeComponent } from './pages/home/home.component';
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
            component: HomeComponent
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
