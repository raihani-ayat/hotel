/* eslint-disable prefer-const */
import { Injectable , NgZone} from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';





@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  public authed = false;
  public uid: any;
  public userEmail: string;
  public loggedInUser;
  constructor( public router: Router, public auth: AngularFireAuth, public ngZone: NgZone ) {
   }

  public logout(){
    this.auth.signOut();
    console.log('out');
  }

  async loggedIn(){
      this.auth.user.subscribe((data=>{
        this.loggedInUser=data;
        this.authed=true;
        this.userEmail=data.email;
        console.log(this.userEmail);
          }));
  }

  googleAuth() {
    return this.authLogin(new firebase.default.auth.GoogleAuthProvider());
  }

  facebookAuth(){
    return this.authLogin(    new firebase.default.auth.FacebookAuthProvider());
  }
  authLogin(provider) {
    return this.auth.signInWithPopup(provider)
    .then((result) => {
       this.ngZone.run(() => {
          this.router.navigate(['home']);
        });
    }).catch((error) => {
      window.alert(error);
    });
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
