import { Component, OnInit, Input } from '@angular/core';
import { map } from 'rxjs/operators';

import { CourseFrontPage } from '../course-front.page';

@Component({
  selector: 'app-list-upload',
  templateUrl: './list-upload.component.html',
  styleUrls: ['./list-upload.component.css']
})
export class ListUploadComponent implements OnInit {
  @Input() pageName: string;

  fileUploads: any[];

  constructor(private uploadService: CourseFrontPage) { }

  ngOnInit() {
    // Use snapshotChanges().pipe(map()) to store the key
    this.uploadService.getFileUploads(100).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(fileUploads => {
      this.fileUploads = fileUploads;
    });
  }

}
