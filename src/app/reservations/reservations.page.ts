import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AppComponent } from '../app.component';
import { Reservation } from '../models/reservation';
import { BookingService } from '../Services/booking.service';


@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.page.html',
  styleUrls: ['./reservations.page.scss'],
})
export class ReservationsPage implements OnInit {
reservations: Array<Reservation> =[];

  constructor(public bs: BookingService, public ac: AppComponent, public location: Location) {
    this.ac.getMenu();
    this.bs.getBookingbyStatus();
    this.bs.delay(3000).then(()=>{
      this.reservations=this.bs.totalReservations;
    });
   }

  ngOnInit() {
  }

  goBack(){
    this.location.back();
  }

}
