import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NewComponent } from "./new/new.component";
import { ListingComponent } from './listing/listing.component';

const routes: Routes = [
  {
    path: "",
    // component: AppLayoutComponent,
    children: [
      {
        path: "list",
        component: ListingComponent
      },
      {
        path: "new",
        component: NewComponent
      },
      {
        path: "**",
        redirectTo: "/app/home"
      }
    ]
  },
  {
    path: "**",
    redirectTo: "/app/home"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListingRoutingModule {}
