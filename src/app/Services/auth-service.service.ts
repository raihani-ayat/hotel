/* eslint-disable prefer-const */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../models/user';



@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  public authed = false;
  public uid: any;
  public userEmail: string;
  public loggedInUser;
  constructor( public router: Router, public auth: AngularFireAuth ) {
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
}
