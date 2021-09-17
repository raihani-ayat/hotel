import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { AuthServiceService } from '../Services/auth-service.service';
import { ToastController } from '@ionic/angular';
import { AppComponent } from '../app.component';
import { BookingService } from '../Services/booking.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.page.html',
  styleUrls: ['./forgotten-password.page.scss'],
})
export class ForgottenPasswordPage implements OnInit {
  public user: User = new User();

  constructor(
    public ac: AppComponent,
    public auth: AuthServiceService,
    public fAuth: AngularFireAuth,
    public toastController: ToastController,
    public location: Location) {
    this.ac.getMenu();
   }

  ngOnInit() {
  }

  async validate(){
    if(this.user.email===undefined){
      const toast = await this.toastController.create({
        message: 'Email required',
        duration: 2000
      });
      toast.present();
    }
    else{
      this.forgotPassword();
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
        message: 'Something went wrong please try again',
        duration: 2000
      });
      toast.present();
    }
  }

  goBack(){
    this.location.back();
  }

}
