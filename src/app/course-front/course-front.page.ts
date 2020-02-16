import { Toast } from "@ionic-native/toast/ngx";
import { adMobVal } from "./../adMob/adMob";
import { Component, OnInit, Injectable, Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ListUploadComponent } from "./list-upload/list-upload.component";
import { DetailsUploadComponent } from "./details-upload/details-upload.component";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { AngularFireStorage } from "@angular/fire/storage";
import anime from "animejs/lib/anime.es.js";
import { FileUpload } from "./fileupload";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { AdMobFree, AdMobFreeBannerConfig } from "@ionic-native/admob-free/ngx";
@Injectable({
  providedIn: "root"
})
@Component({
  selector: "app-course-front",
  templateUrl: "./course-front.page.html",
  styleUrls: ["./course-front.page.scss"]
})
export class CourseFrontPage implements OnInit {
  course: string = "";
  private basePath = "";
  searchComponentBoolean: boolean = true;

  constructor(
    private admobFree: AdMobFree,
    private db: AngularFireDatabase,
    private storage: AngularFireStorage,
    private toast: Toast
  ) {
    // debugger;
  }
  ngOnInit() {
    this.bannerAd();
    this.infoBanner();
  }

  infoBanner() {
    this.toast
      .showWithOptions({
        message: "Please enter Course Code in the Searchbar.",
        duration: 10000,
        position: "top",
        addPixelsY: 100,
        styling: {
          opacity: 0.75, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
          backgroundColor: "#000000", // make sure you use #RRGGBB. Default #333333
          textColor: "#ffffff", // Ditto. Default #FFFFFF
          cornerRadius: 50, // minimum is 0 (square). iOS default 20, Android default 100
          horizontalPadding: 30, // iOS default 16, Android default 50
          verticalPadding: 60 // iOS default 12, Android default 30
        }
      })
      .subscribe(toast => {
        console.log(toast);
      });
  }
  bannerAd() {
    const bannerConfig: AdMobFreeBannerConfig = {
      id:adMobVal.bannerApiKey,// "ca-app-pub-3940256099942544/6300978111", //
      isTesting: false,
      autoShow: true
    };
    this.admobFree.banner.config(bannerConfig);

    this.admobFree.banner
      .prepare()
      .then(() => {})
      .catch(e => console.log(e));
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
            //  console.log("File available at", downloadURL);
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
    // console.log("course Name is LALAL ", courseNameBeingSent);
    this.course = courseNameBeingSent;
    this.basePath = "/Courses/" + courseNameBeingSent;
    this.searchComponentBoolean = false;
    // console.log(this.searchComponentBoolean);
  }

  reset() {
    this.searchComponentBoolean = true;
  }
}
