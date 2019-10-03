import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-r',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {
  username = '';
  password = '';
  password2 = '';
  idExists = false;
  passwordIssue = false;
  messageForEmail = '';
  messageForPwd = '';


  constructor(
    public afAuth: AngularFireAuth,
    public alert: AlertController,
    public router: Router
  ) { }

  ngOnInit() {
  }

  async signup() {
    const { username, password, password2 } = this;

    if (/(.+)@(.+){2,}\.(.+){2,}/.test(username)) {
      //console.log('Valid email');

      if (password.match(/[a-z]/g) && password.match(
        //console.log('Valid Password');
        /[A-Z]/g) && password.match(
          /[0-9]/g) && password.match(
            /[^a-zA-Z\d]/g) && password.length >= 8) {

        try {

          if (password != password2) {
            //console.log('Passwords don\'t match');
            //this.showAlert('Error!', 'Passwords don\'t match');
            this.passwordIssue = true;
            this.messageForPwd = 'Passwords do not match';
            return console.error('Unmatching Passwords');
          }
          const res = await this.afAuth.auth.createUserWithEmailAndPassword(username, password);
          // console.error(res);
          //this.showAlert('Success!', 'Welcome aboard!');
          this.router.navigate(['/tabs']);
          return console.error('User Created!');
        } catch (error) {

          if (error.code == 'auth/email-already-in-use') {
            //console.log('Email already exists');
            this.idExists = true;
            this.messageForEmail = 'Email already taken!';

          }
          //console.dir(error);
          //this.showAlert('Error', error.message);
        }
      }
      else {
        //console.log('Invalid Passwords');
        this.passwordIssue = true;
        this.messageForPwd = 'At least each of uppercase, lowercase, digit, special character. Minimum 8 characters.';
      }
    }
    else {
      //console.log('Invalid email');
      this.passwordIssue = false;
      this.idExists = true;
      this.messageForEmail = 'Invalid Email';

    }
  }

  /*
  async showAlert(header: string, message: string) {
    const alert = await this.alert.create({
      header,
      message, buttons: ['Ok']

    });
  }
*/
}