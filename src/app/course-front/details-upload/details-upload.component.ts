import { Component, OnInit, Input } from "@angular/core";
import { FileUpload } from "../fileupload";
import { CourseFrontPage } from "../course-front.page";
import { Router } from "@angular/router";
import { File } from "@ionic-native/File/ngx";
import { FileTransfer } from "@ionic-native/file-transfer/ngx";
import { Platform } from "@ionic/angular";
import { FileOpener } from "@ionic-native/file-opener/ngx";

import {
  DocumentViewer,
  DocumentViewerOptions
} from "@ionic-native/document-viewer/ngx";

@Component({
  selector: "app-details-upload",
  templateUrl: "./details-upload.component.html",
  styleUrls: ["./details-upload.component.css"]
})
export class DetailsUploadComponent implements OnInit {
  @Input() fileUpload: FileUpload;

  constructor(
    private platform: Platform,
    private document: DocumentViewer,
    private fileOpener: FileOpener,
    private ft: FileTransfer,
    private file: File,
    private uploadService: CourseFrontPage,
    public router: Router
  ) {}

  ngOnInit() {}

  selectVal(courseSelection) {
    console.log("URL IN PDF PAGE IS " + courseSelection);
    let downloadUrl = courseSelection;
    let path = this.file.dataDirectory;
    const transfer = this.ft.create();

    transfer.download(downloadUrl, path + "myfile.pdf").then(entry => {
      let url = entry.toURL();

      if (this.platform.is("ios")) {
        this.document.viewDocument(url, "application/pdf", {});
      } else {
        this.fileOpener
          .open(url, "application/pdf")
          .then(() => console.log("File is opened"))
          .catch(e => console.log("Error opening file", e));
      }
    });
  }
}
