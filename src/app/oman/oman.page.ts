import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/File/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';
import { enableDebugTools } from '@angular/platform-browser';
import { messaging } from 'firebase';

@Component({
  selector: 'app-oman',
  templateUrl: './oman.page.html',
  styleUrls: ['./oman.page.scss'],
})
export class OmanPage implements OnInit {

  constructor(private platform: Platform, private file: File, private ft: FileTransfer, private fileOpener: FileOpener, private document: DocumentViewer) {
  }

  ngOnInit() {
  }

  openLocalPdf() {
    let filePath = this.file.applicationDirectory = 'www/assets';

    if (this.platform.is('android')) {
      let fakeName = Date.now();
      this.file.copyFile(filePath, '5-tool.pdf', this.file.dataDirectory, '${fakeName}.pdf').then(results => {
        this.fileOpener.open(results.nativeURL, 'application/pdf');
      });
    }
    else {
      const options: DocumentViewerOptions = {
        title: 'My PDF'
      }
      this.document.viewDocument('${filePath}/5-tools.pdf', 'application/pdf', options);
    }
  }
  downloadAndOpenPdf() {
    let downloadUrl = 'https://www.irs.gov/pub/irs-pdf/i1040gi.pdf';
    let path = this.file.dataDirectory;
    const transfer = this.ft.create();
    transfer.download(downloadUrl, '${path}myfile.pdf').then(entry => {


     let url = entry.toURL();
      if (this.platform.is('ios')) {
        this.document.viewDocument(url, 'application/pdf', {});

      }
      else {
        console.log("this platform is not IOS");

        this.fileOpener.open(url, 'application/pdf');

      }
    });
  }

}
