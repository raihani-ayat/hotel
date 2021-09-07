import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthServiceService } from './Services/auth-service.service';
import { BookingService } from './Services/booking.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
public authed;
public email;
admin$= false;
user$=false;
  outNav= [
  {
    title : 'Subscribe',
    url   : '/sign-up',
    icon  : 'person-circle'
  },
  {
    title : 'Login',
    url   : '/login',
    icon  : 'log-out'
  },
    ];
  adminNav=[
      {
        title : 'Home',
        url   : '/admin-home',
        icon  : 'home'
      },{
        title : 'Reservations',
        url : 'reservations',
        icon : 'pricetag'
      },
      {
        title : 'Rooms',
        url : '/rooms',
        icon : 'bed'
      },
      {
        title : 'Add new room',
        url   : '/new-room',
        icon  : 'add'
      },
      {
        title : 'Logout',
        url   : '/logout',
        icon  : 'log-out'
      },
        ];
   userNav=[
          {
            title : 'Home',
            url   : '/home',
            icon  : 'home'
          },{
            title : 'New reservation',
            url : '/new-reservation',
            icon : 'add'
          },
          {
            title : 'My reservations',
            url : '/user-reservations',
            icon : 'bookmark'
          },
          {
            title : 'Logout',
            url   : '/logout',
            icon  : 'log-out'
          },
        ];

  constructor(public auth: AuthServiceService, public bs: BookingService, public fAuth: AngularFireAuth) {
    this.fAuth.authState.subscribe(user => {
        if(user){
          this.authed=true;
          if(user.email==='admin@admin.com'){
            this.admin$=true;
          }
          else{
            this.user$=true;
          }
        }
    });
  }

  getMenu(){
    this.fAuth.authState.subscribe(user => {
      if(user){
        this.authed=true;
        if(user.email==='admin@admin.com'){
          this.admin$=true;
        }
        else{
          this.user$=true;
        }
      }
    });
  }


  ngOnInit() {

      }


}
