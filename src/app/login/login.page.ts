import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase/app";
import { Router } from "@angular/router";
import anime from "animejs/lib/anime.es.js";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  username = "";
  password = "";
  usernameIsWrong = false;
  passwordIsWrong = false;
  invalidEmail = false;
  messageForEmail = "";

  constructor(
    public afAuth: AngularFireAuth, // public user: UserService,
    public router: Router
  ) {}

  ngOnInit() {
    var current = null;
    document.querySelector("#username").addEventListener("focus", function(e) {
      if (current) current.pause();
      current = anime({
        targets: "path",
        strokeDashoffset: {
          value: 0,
          duration: 700,
          easing: "easeOutQuart"
        },
        strokeDasharray: {
          value: "240 1386",
          duration: 700,
          easing: "easeOutQuart"
        }
      });
    });
    document.querySelector("#password").addEventListener("focus", function(e) {
      if (current) current.pause();
      current = anime({
        targets: "path",
        strokeDashoffset: {
          value: -336,
          duration: 700,
          easing: "easeOutQuart"
        },
        strokeDasharray: {
          value: "240 1386",
          duration: 700,
          easing: "easeOutQuart"
        }
      });
    });
    document.querySelector("#submit").addEventListener("focus", function(e) {
      if (current) current.pause();
      current = anime({
        targets: "path",
        strokeDashoffset: {
          value: -730,
          duration: 700,
          easing: "easeOutQuart"
        },
        strokeDasharray: {
          value: "530 1386",
          duration: 700,
          easing: "easeOutQuart"
        }
      });
    });
  }

  async login() {
    console.log("login fucntion");
    const { username, password } = this;
    if (/(.+)@(.+){2,}\.(.+){2,}/.test(username)) {
      console.log("Valid email",username, password);
      this.invalidEmail = false;
      //Sending email to Firebase authentication
      try {
        const res = await this.afAuth.auth.signInWithEmailAndPassword(
          username,
          password
        );
        if (res.user) {
          console.log("User Logged in");
          this.usernameIsWrong = false;
          this.passwordIsWrong = false;

          this.router.navigate(["/admin-control"]);
        }
      } catch (err) {
        //console.dir(err);
        if (err.code == "auth/wrong-password") {
          console.log("Password is wrong");
          this.passwordIsWrong = true;
        }
        if (err.code === "auth/user-not-found") {
          console.log("User not found");
          this.invalidEmail = true;
          this.messageForEmail = "User not found";
        } else {
          this.invalidEmail = false;
        }
      }
    } else {
      console.log("Invalid email");
      this.invalidEmail = true;
      this.messageForEmail = "Invalid Email";
    }
  }
}

// alert("you have selected = " + val);
