import { Component, OnInit } from '@angular/core';
//import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { AuthServiceService } from '../Services/auth-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public user: User = new User();

  constructor( public router: Router, public auth: AuthServiceService) { }

  ngOnInit() {
  }

  /*async login() {
    try {
      const r = await this.fAuth.auth.signInWithEmailAndPassword(
        this.user.email,
        this.user.password,
      );
      if (r) {
        console.log('Successfully logged in!');
        this.auth.authed= true;
        this.fAuth.authState.subscribe(user => {
          if(user) {
            this.auth.uid = user.uid;
          }
      });
      this.router.navigateByUrl('/home');
    }

    } catch (err) {
      console.error(err);
    }
  }*/

}
