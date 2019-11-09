import { Component, OnInit, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { CourseFrontPage } from "../course-front/course-front.page";
import { SearchComponent } from "../search-component/search-component.component";
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
@Component({
  selector: "app-search",
  templateUrl: "./search.page.html",
  styleUrls: ["./search.page.scss"]
})
export class SearchPage {

  //Observables
  courseObservable: Observable<any>;
  private courseSubject = new Subject<any>();

  isItemAvailable = false;
  course: string;
  courseList: any = [];
  constructor(public router: Router) {
    this.courseObservable = this.courseSubject.asObservable();
    this.intitializeCourseList();
  }

  insertCourseName(cName) {
    this.courseSubject.next(cName);
    this.courseSubject.complete();
    console.log("SearchPage's insertCourseName's Course Name: ", cName);
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
    this.course = courseSelection;
    console.log("course Name is " + this.course);
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
