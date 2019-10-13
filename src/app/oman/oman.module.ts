import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { environment } from "../../environments/environment";

import { IonicModule } from "@ionic/angular";

import { OmanPage } from "./oman.page";

import { FormUploadComponent } from "./form-upload/form-upload.component";
import { ListUploadComponent } from "./list-upload/list-upload.component";
import { DetailsUploadComponent } from "./details-upload/details-upload.component";

const routes: Routes = [
  {
    path: "",
    component: OmanPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ],
  providers: [],
  declarations: [
    OmanPage,
    FormUploadComponent,
    ListUploadComponent,
    DetailsUploadComponent
  ]
})
export class OmanPageModule {}
