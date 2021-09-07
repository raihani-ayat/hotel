import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { AuthServiceService } from '../Services/auth-service.service';
import { ToastController } from '@ionic/angular';
import { AppComponent } from '../app.component';
import { BookingService } from '../Services/booking.service';



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
     public toastController: ToastController,
     public appC: AppComponent,
     public bs: BookingService) {
       this.appC.getMenu();
     }

  ngOnInit() {
  }

  async login() {
    try {
       await this.fAuth.signInWithEmailAndPassword(
        this.user.email,
        this.password,
      ).then(()=>{
          this.auth.authed= true;
          this.fAuth.authState.subscribe(user => {
            if(user) {
              this.auth.uid = user.uid;
              if(user.email==='admin@admin.com' ){
                this.router.navigateByUrl('/admin-home');
              }
              else{
                this.router.navigateByUrl('/home');
              }
            }
        });
      });

    } catch (err) {
      console.error(err);
      const toast = await this.toastController.create({
        message: 'The email or password is wrong, please try again!',
        duration: 2000
      });
      toast.present();
    }
  }

  async validate(){
    if(this.user.email===undefined || this.password===undefined){
      const toast = await this.toastController.create({
        message: 'Please fill all the required fields',
        duration: 2000
      });
      toast.present();
    }else{
      this.login();
    }
  }

  async forgotPassword() {
    this.router.navigateByUrl('/forgotten-password');
  }

  googleAuth(){
    this.auth.googleAuth();
  }

  facebookAuth(){
    this.auth.facebookAuth();
  }
}
