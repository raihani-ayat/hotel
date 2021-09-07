import { Component, OnInit } from '@angular/core';
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
public navigate= [
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

  constructor(public auth: AuthServiceService, public bs: BookingService) {
  }

  async  getMenu(){
    await this.auth.loggedIn();
      this.bs.delay(1000).then(()=>{
        this.authed=this.auth.authed;
        this.email=this.auth.userEmail;
        if(this.authed){
          if(this.email==='admin@admin.com'){
            this.navigate= [
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
              }
              else{
                this.navigate=[
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
              }
        }

      });

}

  ngOnInit() {

      }


}
