import { Component, OnInit } from '@angular/core';
import { BookingService } from '../Services/booking.service';
import { Reservation } from '../models/reservation';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.page.html',
  styleUrls: ['./admin-home.page.scss'],
})
export class AdminHomePage implements OnInit {
  pendingReservation: Array<Reservation> =[];
  confirmedReservations: Array<Reservation> =[];
  totalReservations: Array<Reservation> =[];
  pendingReservationNumber= 0;
  confirmedReservationsNumber= 0;
  totalReservationsNumber= 0;

  constructor(public bs: BookingService) {
    this.bs.getBookingbyStatus();
    this.bs.delay(3000).then(()=>{
      this.confirmedReservations=this.bs.confirmedReservations;
      this.confirmedReservationsNumber=this.bs.confirmedReservationsNumber;
      this.pendingReservation=this.bs.pendingReservation;
      this.pendingReservationNumber=this.bs.pendingReservationNumber;
      this.totalReservations=this.bs.totalReservations;
      this.totalReservationsNumber=this.bs.totalReservationsNumber;
    });

   }

  ngOnInit() {
  }

}
