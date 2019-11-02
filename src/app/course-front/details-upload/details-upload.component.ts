import { Component, OnInit, Input } from '@angular/core';
import { FileUpload } from '../fileupload';
import { CourseFrontPage } from '../course-front.page';

@Component({
  selector: 'app-details-upload',
  templateUrl: './details-upload.component.html',
  styleUrls: ['./details-upload.component.css']
})
export class DetailsUploadComponent implements OnInit {

  @Input() fileUpload: FileUpload;

  constructor(private uploadService: CourseFrontPage) { }

  ngOnInit() {
  }

  deleteFileUpload(fileUpload) {
    this.uploadService.deleteFileUpload(fileUpload);
  }

}
