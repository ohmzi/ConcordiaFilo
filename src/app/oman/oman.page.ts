//HTTP FIXED!!!
import { Component, OnInit } from '@angular/core';
import { Platform, LoadingController } from '@ionic/angular';
import { File } from '@ionic-native/File/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';
import { enableDebugTools } from '@angular/platform-browser';
import { messaging } from 'firebase';
import { HTTP } from '@ionic-native/http/ngx';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { from } from 'rxjs';

@Component({
  selector: 'app-oman',
  templateUrl: './oman.page.html',
  styleUrls: ['./oman.page.scss'],
})
export class OmanPage implements OnInit {

  data = [];
  constructor(
    private http: HttpClient,
    private nativeHttp: HTTP,
    private platform: Platform,
    private file: File,
    private fileOpener: FileOpener,
    private document: DocumentViewer,
    private transfer: FileTransfer,
    private loadingCtrl: LoadingController) {
  }

  ngOnInit() {
  }
  /*
  downloadAndOpenPdf() {
 
    var options = {
      title: 'My PDF',
      documentView: {
        closeLabel: 'close'
      },
      navigationView: {
        closeLabel: 'nagivation'
      },
      email: {
        enabled: true
      },
      print: {
        enabled: true
      },
      openWith: {
        enabled: true
      },
      bookmarks: {
        enabled: true
      },
      search: {
        enabled: true
      },
      autoClose: {
        onPause: false
      }
    }
 
 
    let url = 'http://www.hp.com/united-states/campaigns/workstations/images/datasheet_z1.pdf';
    let path = null;
    if (this.platform.is('ios')) {
      path = this.file.documentsDirectory;
    } else if (this.platform.is('android')) {
      path = this.file.dataDirectory;
    }
    const transfer = this.transfer.create();
    transfer.download(url, path + 'myfile.pdf').then(entry => {
      let url = entry.toURL();
      this.document.viewDocument(url, 'application/pdf', {});
    });
    //this.document.viewDocument('www/assets/5-tools.pdf', 'application/pdf', options)
  }
//*/

  openLocalPdf() {
    let filePath = this.file.applicationDirectory + 'www/assets';
    if (this.platform.is('android')) {
      let fakeName = Date.now();
      this.file.copyFile(filePath, '5-tools.pdf', this.file.dataDirectory, '$(fakeName).pdf').then(result => {
        this.fileOpener.open(result.nativeURL, 'application/pdf');
      });
    }
    else {
      const options1: DocumentViewerOptions = {
        title: 'My PDF'
      }
      this.document.viewDocument('${filePath}/5-tools.pdf', 'applications/pdf', options1);
    }
  }



  downloadAndOpenPdf() {
    let downloadUrl = 'whatever.pdf';
    let path = this.file.dataDirectory;
    const transfer = this.transfer.create();
    transfer.download(downloadUrl, '${path}myfile.pdf').then(entry => {
      let url = entry.toURL();
      if (this.platform.is('ios')) {
        this.document.viewDocument(url, 'application/pdf', {});
      }
      else {
        this.fileOpener.open(url, 'apllication/pdf');
      }
    })
  }


  async getDataStandard() {
    let loading = await this.loadingCtrl.create();
    await loading.present();

    this.http.get('http://swapi.co/api/films').pipe(
      finalize(() => loading.dismiss())
    )
      .subscribe(data => {
        this.data = data['results'];
      }, err => {
        console.log('JS call error: ', err);
      });
  }

  async getDataNative() {
    let loading = await this.loadingCtrl.create();
    await loading.present();

    let nativeCall = this.nativeHttp.get('http://swapi.co/api/films', {}, {
      'Content-Type': 'application/json'
    });
    from(nativeCall).pipe(
      finalize(() => loading.dismiss())
    )
      .subscribe(data => {
        console.log('native Data: ', data);
        let parsed = JSON.parse(data.data).results;
        this.data = parsed;
      }, err => {
        console.log('JS call error: ', err);
      });
  }
  async getDataEverywhere() {
    this.platform.is('cordova') ? this.getDataNative() : this.getDataStandard();
  }
}




/*


downloadAndOpenPdf(url) {
let path = null;
if (this.platform.is('ios')) {
  path = this.file.documentsDirectory;
} else if (this.platform.is('android')) {
  path = this.file.dataDirectory;
}
const transfer = this.transfer.create();
transfer.download(url, path + 'myfile.pdf').then(entry => {
  let url = entry.toURL();
  this.document.viewDocument(url, 'application/pdf', {});
});
}

here file is
import { File } from '@ionic-native/file';
and transfer is
import { FileTransfer } from '@ionic-native/file-transfer';




downloadAndOpenPdf() {
  this.nativeHttp.get('http://ionic.io', {}, {})
    .then(data => {

      console.log(data.status);
      console.log(data.data); // data received by server
      console.log(data.headers);

    })
    .catch(error => {

      console.log(error.status);
      console.log(error.error); // error message as string
      console.log(error.headers);

    });

}/*/

