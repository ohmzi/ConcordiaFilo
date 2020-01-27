import { Component, OnInit, Input } from "@angular/core";
import { map } from "rxjs/operators";
import {
  AdMobFree,
  AdMobFreeBannerConfig,
  AdMobFreeRewardVideoConfig,
  AdMobFreeInterstitialConfig
} from "@ionic-native/admob-free/ngx";
import { CourseFrontPage } from "../course-front.page";
import { adMobVal } from "../../adMob/adMob";
@Component({
  selector: "app-list-upload",
  templateUrl: "./list-upload.component.html",
  styleUrls: ["./list-upload.component.css"]
})
export class ListUploadComponent implements OnInit {
  @Input() pageName: string;

  fileUploads: any[];

  constructor(
    private uploadService: CourseFrontPage,
    private admobFree: AdMobFree
  ) {}

  ngOnInit() {
    this.interstitialAd();

    // Use snapshotChanges().pipe(map()) to store the key
    this.uploadService
      .getFileUploads(100)
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe(fileUploads => {
        this.fileUploads = fileUploads;
      });
  }
  interstitialAd() {
    const interstitialConfig: AdMobFreeInterstitialConfig = {
      id: adMobVal.apiKey,
      isTesting: false,
      autoShow: true
    };
    this.admobFree.interstitial.config(interstitialConfig);

    this.admobFree.interstitial
      .prepare()
      .then(() => {})
      .catch(e => console.log(e));
  }
}
