import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';




@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  public user: User = new User();
  //usersCollectionRef: AngularFirestoreCollection<User>;
  private secureKey: string;
  private secureIV: string;
  private encryptedPassword: string;

  constructor( public router: Router) { }

  ngOnInit() {
  }

  /*async register() {
    try {
      const r = await this.fAuth.auth.createUserWithEmailAndPassword(
        this.user.email,
        this.user.password
      );
      if (r) {
        console.log('Successfully registered!');
        this.fAuth.authState.subscribe(user => {
          if(user) {
            this.user.id = user.uid;
          }
      });

        this.usersCollectionRef.add({id: this.user.id, firstName: this.user.firstName, lastName: this.user.lastName,
                          email: this.user.email, country: this.user.country, password: this.encryptedPassword });
        this.router.navigateByUrl('/home');
      }

    } catch (err) {
      console.error(err);
    }
  }*/

}
