import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthServiceService } from '../Services/auth-service.service';
import { ToastController } from '@ionic/angular';



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  public user: User = new User();
  public password: string;
  usersCollectionRef: AngularFirestoreCollection<User>;

  constructor(
    public router: Router,
    public fAuth: AngularFireAuth,
    public afs: AngularFirestore,
    public as: AuthServiceService,
    public toastController: ToastController) {
    this.usersCollectionRef = this.afs.collection('users');
   }

  ngOnInit() {
  }

  async register() {
    try {
      const r = await this.fAuth.createUserWithEmailAndPassword(
        this.user.email,
        this.password
      );
      if (r) {
        console.log('Successfully registered!');
        this.fAuth.authState.subscribe(user => {
          if(user) {
            this.user.id = user.uid;
            this.as.uid = user.uid;
            this.as.authed= true;
            this.usersCollectionRef.add({id: this.user.id, firstName: this.user.firstName,
              lastName: this.user.lastName,email: this.user.email, country: this.user.country});
          }
      });
      console.log(this.user);
        this.router.navigateByUrl('/home');
      }

    } catch (err) {
      console.error(err);
      const toast = await this.toastController.create({
        message: err,
        duration: 2000
      });
      toast.present();
    }
  }

}
