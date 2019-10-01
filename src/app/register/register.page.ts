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
  passwordNotMatch = false;

  constructor(
    public afAuth: AngularFireAuth,
    public alert: AlertController,
    public router: Router
  ) { }

  ngOnInit() {
  }

  async signup() {
    const { username, password, password2 } = this;
    try {
      if (password != password2) {
        //this.showAlert('Error!', 'Passwords don\'t match');
        this.passwordNotMatch = true;
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
      }
      //console.dir(error);
      //this.showAlert('Error', error.message);
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