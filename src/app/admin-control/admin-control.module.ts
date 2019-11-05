import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { FormUploadComponent } from "../admin-control/form-upload/form-upload.component";

import { IonicModule } from "@ionic/angular";

import { AdminControlPage } from "./admin-control.page";

const routes: Routes = [
  {
    path: "",
    component: AdminControlPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AdminControlPage, FormUploadComponent]
})
export class AdminControlPageModule {}
