import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  navigate =
    [
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
        title : 'Login/Logout',
        url   : '/login',
        icon  : 'log-out'
      },
      {
        title : 'Subscribe',
        url   : '/sign-up',
        icon  : 'person-circle'
      },

    ];

    adminnavigate =
    [
      {
        title : 'Home',
        url   : '/admin-home',
        icon  : 'home'
      },{
        title : 'Reservation management',
        url : 'reservations',
        icon : 'pricetag'
      },
      {
        title : 'Room management',
        url : '/rooms',
        icon : 'bed'
      },
      {
        title : 'Add new room',
        url   : '/new-room',
        icon  : 'add'
      },
      {
        title : 'Login/Logout',
        url   : '/login',
        icon  : 'log-out'
      },

    ];

  constructor() {}

}
