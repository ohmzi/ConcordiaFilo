import { Component, OnInit, Input } from "@angular/core";
import { map } from "rxjs/operators";
import {
  AdMobFree,
  AdMobFreeBannerConfig,
  AdMobFreeRewardVideoConfig,
  AdMobFreeInterstitialConfig
} from "@ionic-native/admob-free/ngx";
import { CourseFrontPage } from "../course-front.page";

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
    {
      const bannerConfig: AdMobFreeBannerConfig = {
        // add your config here
        // for the sake of this example we will just use the test config
        isTesting: true,
        autoShow: true
      };
      this.admobFree.banner.config(bannerConfig);
      this.admobFree.banner
        .prepare()
        .then(() => {
          // banner Ad is ready
          // if we set autoShow to false, then we will need to call the show method here
        })
        .catch(e => console.log(e));
    }

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
      // add your config here
      // for the sake of this example we will just use the test config
      id:'ca-app-pub-9743851463613820/9759476692',
      isTesting: false,
      autoShow: true
    };
    this.admobFree.interstitial.config(interstitialConfig);

    this.admobFree.interstitial.prepare().catch(e => console.log(e));
  }
}
