import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
// import { UserService } from '../user.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

	username = '';
	password = '';
	usernameIsWrong = false;
	passwordIsWrong=false;

	constructor(public afAuth: AngularFireAuth, // public user: UserService,
		public router: Router) { }

	ngOnInit() {
	}

	async login() {
		const { username, password } = this;
		try {
			const res = await this.afAuth.auth.signInWithEmailAndPassword(username, password);
			/*	if (res.user) {
					this.user.setUser({
						username,
						uid: res.user.uid
					});
					this.router.navigate(['/tabs']);
				}
				*/
			if (res.user) {
				console.log('User Logged in');
				this.usernameIsWrong = false;
				this.passwordIsWrong = false;
				this.router.navigate(['/tabs']);

			}


		} catch (err) {
			//console.dir(err);
			if (err.code =='auth/wrong-password'){
				console.log('Password is wrong');
				this.passwordIsWrong = true;
			}
			if (err.code === 'auth/user-not-found') {
				console.log('User not found');
				this.usernameIsWrong = true;
			} else {
			}
		}
	}

}
