import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
// import { UserService } from '../user.service';
import { Router } from '@angular/router';
import {AlertController} from '@ionic/angular';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  username = '';
  password = '';
  password2 = '';

  constructor(
    public afAuth: AngularFireAuth,
    public alert: AlertController,
    public router: Router
    ) { }

  ngOnInit() {
  }

  async signup() {
    const { username, password, password2 } = this;
    if (password !== password2) {
      this.showAlert('Error!', 'Passwords don\'t match');
      return console.error('Password don\'t match!');
    }
    try {
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(username, password);
      console.error(res);
      this.showAlert('Success!', 'Welcome aboard!');
      this.router.navigate(['/tabs']);
    } catch (error) {
      console.dir(error);
      this.showAlert('Error', error.message);
    }

  }
  async showAlert(header: string, message: string) {
    const alert = await this.alert.create({
      header,
      message, buttons: ['Ok']

    });
  }

}



