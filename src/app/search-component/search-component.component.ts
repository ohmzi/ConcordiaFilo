import { Component, Injectable, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
@Component({
  selector: "app-search-component",
  templateUrl: "./search-component.component.html",
  styleUrls: ["./search-component.component.scss"]
})
export class SearchComponentComponent {
  @Output() courseNameEvent = new EventEmitter<string>();

  isItemAvailable = false;
 course = { name: "Place Holder" };
  courseList: any = [];
  constructor(public router: Router) {
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
    //alert("you have selected = " + courseSelection);
    this.course.name = courseSelection;
    //courseSelection="";
    //console.log("course Name is " + this.course.name);
    this.courseNameEvent.emit(courseSelection);

    this.router.navigate(["/course-front"]);
  }

  intitializeCourseList() {
    this.courseList = [
      {
        name: "Math 203"
      },
      {
        name: "Mark 201 & Comm 223"
      },
      {
        name: "Econ 201"
      },
      {
        name: "Econ 203"
      }
    ];
  }
}
