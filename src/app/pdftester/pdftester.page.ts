import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/File/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';


@Component({
  selector: 'app-r',
  templateUrl: './pdftester.page.html',
  styleUrls: ['./pdftester.page.scss'],
})

export class PdftesterPage implements OnInit {
  username = '';
  password = '';
  password2 = '';
  idExists = false;
  passwordIssue = false;
  messageForEmail = '';
  messageForPwd = '';


  constructor(private platform: Platform, private file: File, private ft: FileTransfer,
    private fileOpener: FileOpener, private document: DocumentViewer, public afAuth: AngularFireAuth,
    public alert: AlertController,
    public router: Router
  ) { }
  openLocalPdf() {
    let filePath = this.file.applicationDirectory + 'www/assets';

    if (this.platform.is('android')) {
      let fakeName = Date.now();
      this.file.copyFile(filePath, '5-tools.pdf', this.file.dataDirectory, `${fakeName}.pdf`).then(result => {
        this.fileOpener.open(result.nativeURL, 'application/pdf')
          .then(() => console.log('File is opened'))
          .catch(e => console.log('Error opening file', e));
      })
    } else {
      // Use Document viewer for iOS for a better UI
      const options: DocumentViewerOptions = {
        title: 'My PDF'
      }
      this.document.viewDocument(`${filePath}/5-tools.pdf`, 'application/pdf', options);
    }
  }

  downloadAndOpenPdf() {
    let downloadUrl = 'https://devdactic.com/html/5-simple-hacks-LBT.pdf';
    let path = this.file.dataDirectory;
    const transfer = this.ft.create();

    transfer.download(downloadUrl, path + 'myfile.pdf').then(entry => {
      let url = entry.toURL();

      if (this.platform.is('ios')) {
        this.document.viewDocument(url, 'application/pdf', {});
      } else {
        this.fileOpener.open(url, 'application/pdf')
          .then(() => console.log('File is opened'))
          .catch(e => console.log('Error opening file', e));
      }
    });
  }

  ngOnInit() {
  }
}