import { Component, OnInit, Injectable, Input} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ListUploadComponent } from "./list-upload/list-upload.component";
import { DetailsUploadComponent } from "./details-upload/details-upload.component";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { AngularFireStorage } from "@angular/fire/storage";

import { FileUpload } from "./fileupload";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
@Component({
  selector: "app-course-front",
  templateUrl: "./course-front.page.html",
  styleUrls: ["./course-front.page.scss"]
})
export class CourseFrontPage {
  course: string="";
  private basePath = "";
  searchComponentBoolean: boolean = true;
  listComponentBoolean: boolean = false;

  constructor(
    private db: AngularFireDatabase,
    private storage: AngularFireStorage
  ) {
    // debugger;
  }
  pushFileToStorage(fileUpload: FileUpload): Observable<number> {
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask
      .snapshotChanges()
      .pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe(downloadURL => {
            console.log("File available at", downloadURL);
            fileUpload.url = downloadURL;
            fileUpload.name = fileUpload.file.name;
            this.saveFileData(fileUpload);
          });
        })
      )
      .subscribe();

    return uploadTask.percentageChanges();
  }

  private saveFileData(fileUpload: FileUpload) {
    this.db.list(this.basePath).push(fileUpload);
  }

  getFileUploads(numberItems): AngularFireList<FileUpload> {
    return this.db.list(this.basePath, ref => ref.limitToLast(numberItems));
  }

  deleteFileUpload(fileUpload: FileUpload) {
    this.deleteFileDatabase(fileUpload.key)
      .then(() => {
        this.deleteFileStorage(fileUpload.name);
      })
      .catch(error => console.log(error));
  }

  private deleteFileDatabase(key: string) {
    return this.db.list(this.basePath).remove(key);
  }

  private deleteFileStorage(name: string) {
    const storageRef = this.storage.ref(this.basePath);
    storageRef.child(name).delete();
  }

  receiveCourseName(courseNameBeingSent) {
   // this._store.course = courseNameBeingSent;
    console.log("course Name is LALAL ", courseNameBeingSent);
    this.course=courseNameBeingSent;
    this.basePath = "/Courses/" + courseNameBeingSent;
    this.searchComponentBoolean = false;
    this.listComponentBoolean = true;
    console.log(this.searchComponentBoolean);
  }

  reset(){
    this.listComponentBoolean = false;
    this.searchComponentBoolean = true;
  }
}
