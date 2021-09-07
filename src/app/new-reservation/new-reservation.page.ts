import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Reservation } from '../models/reservation';
import { BookingService } from '../Services/booking.service';


@Component({
  selector: 'app-new-reservation',
  templateUrl: './new-reservation.page.html',
  styleUrls: ['./new-reservation.page.scss'],
})
export class NewReservationPage implements OnInit {
  public newReservation = new Reservation();
  public totalPeople: number;
  searching=false;


  constructor(private bookingS: BookingService, private router: Router, public toastController: ToastController) { }

  ngOnInit() {
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
        if(checkOut<checkIn || diffDays===1){
          const toast = await this.toastController.create({
            message: 'The check out date must be later then the check in date!',
            duration: 2000
          });
          toast.present();
        }
        else{
          if(this.newReservation.kids.toString() !== '0'  && this.newReservation.maxKidsAge===undefined){
          const toast = await this.toastController.create({
            message: 'Max kids age is required!',
            duration: 2000
            });
            toast.present();
          }
          else{
            this.showResults();
          }
        }
      }
    }
  }

}
