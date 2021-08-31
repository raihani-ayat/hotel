import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { AuthServiceService } from '../Services/auth-service.service';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { ToastController } from '@ionic/angular';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public user: User = new User();
  public password: string;

  constructor( public router: Router,
     public auth: AuthServiceService,
     public fAuth: AngularFireAuth,
     public toastController: ToastController) { }

  ngOnInit() {
  }

  async login() {
    try {
      const r = await this.fAuth.signInWithEmailAndPassword(
        this.user.email,
        this.password,
      );
      if (r) {
        console.log('Successfully logged in!');
        this.auth.authed= true;
        this.fAuth.authState.subscribe(user => {
          if(user) {
            this.auth.uid = user.uid;
            this.router.navigateByUrl('/home');
          }
      });
    }

    } catch (err) {
      console.error(err);
    }
  }

  async forgotPassword() {
    try {
      const r = await this.fAuth.sendPasswordResetEmail(
        this.user.email,
      );
      const toast = await this.toastController.create({
        message: 'A reset link has been sent to your email box',
        duration: 2000
      });
      toast.present();

    } catch (err) {
      console.error(err);
      const toast = await this.toastController.create({
        message: err,
        duration: 2000
      });
      toast.present();
    }
  }

 /* async fblogin() {

    this.fb.login(['email'])
      .then((response: FacebookLoginResponse) => {
        this.onLoginSuccess(response);
        console.log(response.authResponse.accessToken);
      }).catch((error) => {
        console.log(error);
        alert('error:' + error);
      });
  }

  onLoginSuccess(res: FacebookLoginResponse) {
    const credential = this.fAuth.signInWithCredential..credential(res.authResponse.accessToken);
    this.fAuth.signInWithCredential(credential)
      .then((response) => {
        this.router.navigate(['/home']);
      });

  }*/

}
