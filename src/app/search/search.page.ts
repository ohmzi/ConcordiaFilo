import { Component, OnInit, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { CourseFrontPage } from "../course-front/course-front.page";
import { Store } from "../store/store";
@Injectable({
  providedIn: "root"
})
@Component({
  selector: "app-search",
  templateUrl: "./search.page.html",
  styleUrls: ["./search.page.scss"]
})
export class SearchPage {
  isItemAvailable = false;
  course = { name: "as" };
  courseList: any = [];
  constructor(
    public router: Router,
    private readonly _store: Store
  ) {
    this.intitializeCourseList();
  }

  CreateCourseList(ev: any) {
    this.intitializeCourseList();
    const val = ev.target.value;
    if (val && val.trim() != "") {
      this.isItemAvailable = true;
      this.courseList = this.courseList.filter(course => {
        return course.name.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    } else {
      this.isItemAvailable = false;
    }
  }
  selectVal(courseSelection) {
    // alert("you have selected = " + val);
    this;
    this.course.name = courseSelection;
    console.log("course Name is " + this.course.name);
    this._store.course = this.course;
    this.router.navigate(["/course-front"]);
  }

  intitializeCourseList() {
    this.courseList = [
      {
        name: "Math 203",
      },
      {
        name: "Math 204",
      },
      {
        name: "Math 205",
      },
      {
        name: "Geog 204",
      },
      {
        name: "Geog 210",
      }
    ];
  }
}
