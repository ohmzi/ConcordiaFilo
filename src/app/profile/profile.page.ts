import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, LoadingController } from '@ionic/angular';
import { HTTP } from '@ionic-native/http/ngx';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { from } from 'rxjs';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';
import { File } from '@ionic-native/File/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  data = [];


  async getDataNative() {
    let loading = await this.loadingCtrl.create();
    await loading.present();

    let nativeCall = this.nativeHttp.get('http://swapi.co/api/films', {}, {
      'Content-Type': 'application/json'
    });
    from(nativeCall).pipe(
      finalize(() => loading.dismiss())
    )
      .subscribe(data => {
        console.log('native Data: ', data);
        let parsed = JSON.parse(data.data).results;
        this.data = parsed;
      }, err => {
        console.log('JS call error: ', err);
      });
  }
  jsonData: any = [];
  constructor(private http: HttpClient,
    private file: File,
    private fileOpener: FileOpener,
    private document: DocumentViewer,
    private transfer: FileTransfer,
    private nativeHttp: HTTP,
    private platform: Platform, public router: Router, private loadingCtrl: LoadingController) {
    this.intitializeJSONData();

  }

  FilterJSONData(ev: any) {

    this.intitializeJSONData();
    const val = ev.target.value;
    if (val && val.trim() != '') {
      this.isItemAvailable = true;
      this.jsonData = this.jsonData.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);

      })
    }
    else {
      this.isItemAvailable = false;
    }
  }
  selectVal(val) {
    alert("you have selected = " + val);
    this.router.navigate(['/' + val]);


  }
  isItemAvailable = false;

  intitializeJSONData() {
    this.jsonData =
      [{
        'name': "Egypt",
        "code": "EG"
      },
      {
        "name": "Oman",
        "code": "Om"
      },
      {
        "name": "USA",
        "code": "US"
      },
      {
        "name": "adijsandon",
        "code": "Omvsfd"
      },
      {
        "name": "Omjythgfan",
        "code": "Oloikukm"
      },
      {
        "name": "Omwertyuan",
        "code": "Onbvcm"
      },
      {
        "name": "Ompoiuyan",
        "code": "lkjOm"
      }];

  }
  downloadAndOpenPdf() {

    let filePath = this.file.applicationDirectory + 'www/assets';
    if (this.platform.is('android')) {
      let fakeName = Date.now();
      this.file.copyFile(filePath, '5-tools.pdf', this.file.dataDirectory, '$(fakeName).pdf').then(result => {
        this.fileOpener.open(result.nativeURL, 'application/pdf');
      });
    }
    else {
      const options1: DocumentViewerOptions = {
        title: 'My PDF'
      }
      this.document.viewDocument('${filePath}/5-tools.pdf', 'applications/pdf', options1);
    }
  }
  ngOnInit() {
  }

}
