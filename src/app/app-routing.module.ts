import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "tabs", pathMatch: "full" },
  {
    path: "login",
    loadChildren: () =>
      import("./login/login.module").then(m => m.LoginPageModule)
  },
  {
    path: "register",
    loadChildren: () =>
      import("./register/register.module").then(m => m.RegisterPageModule)
  },
  {
    path: "tabs",
    loadChildren: () => import("./tabs/tabs.module").then(m => m.TabsPageModule)
  },
  {
    path: "firelist",
    loadChildren: "./firelist/firelist.module#FirelistPageModule"
  },
  {
    path: "course-front",
    loadChildren: () =>
      import("./course-front/course-front.module").then(
        m => m.CourseFrontPageModule
      )
  },
  {
    path: "admin-control",
    loadChildren: "./admin-control/admin-control.module#AdminControlPageModule"
  },
  {
    path: "pdftester",
    loadChildren: "./pdftester/pdftester.module#PdftesterPageModule"
  },
  {
    path: "profile",
    loadChildren: "./profile/profile.module#ProfilePageModule"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
