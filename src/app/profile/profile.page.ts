import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  jsonData: any = [];
  constructor(public router: Router) {
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
    this.router.navigate(['/'+val]);


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

  ngOnInit() {
  }

}
