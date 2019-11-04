import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "search", pathMatch: "full" },
  {
    path: "login",
    loadChildren: "./login/login.module#LoginPageModule"
  },
  {
    path: "course-front",
    loadChildren: "././course-front/course-front.module#CourseFrontPageModule"
  },
  {
    path: "admin-control",
    loadChildren: "./admin-control/admin-control.module#AdminControlPageModule"
  },
  {
    path: "search",
    loadChildren: "./search/search.module#SearchPageModule"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
