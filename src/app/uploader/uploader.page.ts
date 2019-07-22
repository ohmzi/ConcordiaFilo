import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.page.html',
  styleUrls: ['./uploader.page.scss'],
})
export class UploaderPage implements OnInit {

  imageURL: string;
  constructor(public http: Http) {
    // API for 85b3797afd60570be745
  }

  ngOnInit() {
  }

  fileChanged(event) {
    const files = event.target.files;

    const data = new FormData();
    data.append('file', files[0]);
    data.append('UPLOADCARE_STORE', '1');
    data.append('UPLOADCARE_PUB_KEY', '85b3797afd60570be745');
    console.log(files);
    this.http.post('https://upload.uploadcare.com/base/',
      data).subscribe(event => { console.log(event)
                                 this.imageURL = event.json().file; });
  }
}
