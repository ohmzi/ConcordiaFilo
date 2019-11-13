import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { ListUploadComponent } from "./list-upload/list-upload.component";
import { DetailsUploadComponent } from "./details-upload/details-upload.component";

import { IonicModule } from "@ionic/angular";

import { CourseFrontPage } from "./course-front.page";
import { SearchComponentComponent } from '../search-component/search-component.component';

const routes: Routes = [
  {
    path: "",
    component: CourseFrontPage
  }
];

@NgModule({
  declarations: [
    SearchComponentComponent,
    CourseFrontPage,
    ListUploadComponent,
    DetailsUploadComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ]
})
export class CourseFrontPageModule {}
