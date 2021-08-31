/* eslint-disable @typescript-eslint/naming-convention */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { BookpopoverPage } from '../bookpopover/bookpopover.page';
import { Reservation } from '../models/reservation';
import { BookingService } from '../Services/booking.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public newReservation = new Reservation();

  constructor(private popover: PopoverController, private bookingS: BookingService,
    private router: Router) {}

  OpenPopover(){
    this.popover.create({component:BookpopoverPage,
      showBackdrop:false}).then((popoverElement)=>{
        popoverElement.present();
      });
  }

  showResults(){
    this.bookingS.findRoom(this.newReservation);
    this.bookingS.reservation= this.newReservation;
    this.router.navigateByUrl('/results');
  }
}
