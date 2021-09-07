import { Component, OnInit } from '@angular/core';
import { Reservation } from '../models/reservation';
import { BookingService } from '../Services/booking.service';


@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.page.html',
  styleUrls: ['./reservations.page.scss'],
})
export class ReservationsPage implements OnInit {
reservations: Array<Reservation> =[];

  constructor(public bs: BookingService) {
    this.bs.getBookingbyStatus();
    this.bs.delay(3000).then(()=>{
      this.reservations=this.bs.totalReservations;
    });
   }

  ngOnInit() {
  }

}
