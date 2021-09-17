import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  constructor(public router: Router,public fAuth: AngularFireAuth) {
    setTimeout(()=>{this.fAuth.authState.subscribe(user => {
      if(user){
        if(user.email==='admin@admin.com'){
          this.router.navigateByUrl('/admin-home');
        }
        else{
          this.router.navigateByUrl('/home');
        }
      }else{
        this.router.navigateByUrl('/home');
      }
  });
    },2000);
  }

  ngOnInit() {
  }

}
