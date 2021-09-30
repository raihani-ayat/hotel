/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable prefer-const */
import { Injectable , NgZone} from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { Platform } from '@ionic/angular';





@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  public authed = false;
  public uid: any;
  public userEmail: string;
  public loggedInUser;
  constructor( public router: Router, public auth: AngularFireAuth, public ngZone: NgZone, public fb: Facebook,
    public platform: Platform ) {
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
    //return this.authLogin(new firebase.default.auth.GoogleAuthProvider());
    this.auth.signInWithPopup(new firebase.default.auth.GoogleAuthProvider()).then(()=>{
      this.router.navigateByUrl('/home');
    });
  }

  facebookAuth(){
    return this.authLogin(new firebase.default.auth.FacebookAuthProvider());
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

  doLogin() {
    if(this.platform.is('cordova')){
      this.fbLogin();

      /*this.fb.login(['email'])
    .then((response: FacebookLoginResponse) => {
      this.loginWithFacebook(response.authResponse.accessToken).then(()=>{
        this.router.navigateByUrl('/home');
      });
    }).catch((error) => {
      alert('error:' + JSON.stringify(error));
    });*/
    } else{
      this.fbLogin();
    }
  }

  loginWithFacebook(accessToken) {
      const credential = firebase.default.auth.FacebookAuthProvider
          .credential(accessToken);
      return this.auth.signInWithCredential(credential);
  }

  fbLogin(): Promise<any> {
    return this.auth.signInWithPopup(new firebase.default.auth.FacebookAuthProvider()).then(()=>{
      this.router.navigateByUrl('/home');
    });
  }

}
