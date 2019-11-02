import { Injectable } from "@angular/core";

export interface Course {
  name: string;
}

@Injectable({ providedIn: "root" })
export class Store {
  course: Course = null;

  constructor() {
      console.count('instantiated store');
  }
}
