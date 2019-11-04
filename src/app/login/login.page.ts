import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase/app";
import { Router } from "@angular/router";

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

  ngOnInit() {}

  async login() {
    const { username, password } = this;
    if (/(.+)@(.+){2,}\.(.+){2,}/.test(username)) {
      //console.log('Valid email');
      this.invalidEmail = false;
      //Sending email to Firebase authentication
      try {
        const res = await this.afAuth.auth.signInWithEmailAndPassword(
          username,
          password
        );
        if (res.user) {
          //console.log('User Logged in');
          this.usernameIsWrong = false;
          this.passwordIsWrong = false;
          this.router.navigate(["/admin-control"]);
        }
      } catch (err) {
        //console.dir(err);
        if (err.code == "auth/wrong-password") {
          //	console.log('Password is wrong');
          this.passwordIsWrong = true;
        }
        if (err.code === "auth/user-not-found") {
          //console.log('User not found');
          this.invalidEmail = true;
          this.messageForEmail = "User not found";
        } else {
          this.invalidEmail = false;
        }
      }
    } else {
      //console.log('Invalid email');
      this.invalidEmail = true;
      this.messageForEmail = "Invalid Email";
    }
  }
}

// alert("you have selected = " + val);
