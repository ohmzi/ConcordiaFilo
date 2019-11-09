import { Component, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { SearchPage } from "../search/search.page";
@Injectable({
  providedIn: "root"
})
@Component({
  selector: "app-search-component",
  templateUrl: "./search-component.component.html",
  styleUrls: ["./search-component.component.scss"]
})
export class SearchComponent {
  isItemAvailable = false;
  course: string;
  courseList: any = [];

  public cName: string;

  constructor(public router: Router, public _SearchPage: SearchPage) {
    this.intitializeCourseList();
  }

  CreateCourseList(ev: any) {
    this.intitializeCourseList();
    const val = ev.target.value;
    if (val && val.trim() != "") {
      this.isItemAvailable = true;
      this.courseList = this.courseList.filter(coursesInList => {
        return coursesInList.name.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    } else {
      this.isItemAvailable = false;
    }
  }
  selectVal(courseSelection) {
    // alert("you have selected = " + val);
    this;
    this.course = courseSelection;
    console.log("SearchComponent's Course Name: ", this.course);

    this.cName = this.course;
    this._SearchPage.insertCourseName(this.cName);

    this.router.navigate(["/course-front"]);
  }

  intitializeCourseList() {
    this.courseList = [
      {
        name: "Math 203"
      },
      {
        name: "Math 204"
      },
      {
        name: "Math 205"
      },
      {
        name: "Geog 204"
      },
      {
        name: "Geog 210"
      }
    ];
  }
}
