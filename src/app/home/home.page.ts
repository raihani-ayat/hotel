/* eslint-disable @typescript-eslint/naming-convention */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { PopoverController, ToastController } from '@ionic/angular';
import { AppComponent } from '../app.component';
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
  public totalPeople: number;
  searching=false;

  constructor(private popover: PopoverController, private bookingS: BookingService,
    private router: Router, public toastController: ToastController, public ac: AppComponent, public location: Location) {
      this.ac.getMenu();
    }

  OpenPopover(){
    this.popover.create({component:BookpopoverPage,
      showBackdrop:false}).then((popoverElement)=>{
        popoverElement.present();
      });
  }


  goBack(){
    this.location.back();
  }

  showResults(){
    this.searching=true;
    const adults= Number(this.newReservation.adults);
    const kids= Number(this.newReservation.kids);
    this.bookingS.reservation= this.newReservation;
    this.totalPeople= adults+kids;
    this.bookingS.findRoom(this.newReservation, this.totalPeople);
    this.bookingS.delay(2000).then(()=>{
          this.searching=false;
          this.router.navigateByUrl('/results');
        });
  }

  async  validate(){
    const now= new Date().setHours(0,0,0,0);
    const past= new Date(this.newReservation.checkIn).setHours(0,0,0,0)< now;
    if(past){
      const toast = await this.toastController.create({
        message: 'Please choose valid dates',
        duration: 2000
      });
      toast.present();
    }
    else{
    if(this.newReservation.checkIn===undefined || this.newReservation.checkOut===undefined || this.newReservation.kids===undefined
      || this.newReservation.adults===undefined || this.newReservation.roomType===undefined){
          const toast = await this.toastController.create({
            message: 'Please fill all the required fields!',
            duration: 2000
          });
          toast.present();
      }
      else{
        const checkIn= new Date(this.newReservation.checkIn).valueOf();
        const checkOut = new Date(this.newReservation.checkOut).valueOf();
        const diff = Math.abs(new Date(this.newReservation.checkOut).getTime() - new Date(this.newReservation.checkIn).getTime());
        const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
        if(checkOut<checkIn || diffDays<1){
          const toast = await this.toastController.create({
            message: 'The check out date must be later then the check in date!',
            duration: 2000
          });
          toast.present();
        }
        else{
          if(this.newReservation.kids.toString() !== '0'  ){
            if(this.newReservation.maxKidsAge===undefined){
              const toast = await this.toastController.create({
                message: 'Max kids age is required!',
                duration: 2000
                });
                toast.present();
            }
          }
          else{
            this.showResults();
          }
        }
      }
    }
  }

}
