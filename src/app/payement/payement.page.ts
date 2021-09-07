import { Component, OnInit } from '@angular/core';
import { BookingService } from '../Services/booking.service';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Room } from '../models/room';
import { Reservation } from '../models/reservation';
import { AuthServiceService } from '../Services/auth-service.service';
import { ToastController } from '@ionic/angular';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-payement',
  templateUrl: './payement.page.html',
  styleUrls: ['./payement.page.scss'],
})
export class PayementPage implements OnInit {
  public room= new Room();
  public totalPrice = 0;
  public reservationCollectionRef: AngularFirestoreCollection<Reservation>;
  cancelDate;

  constructor(public bs: BookingService,public router: Router, public fs: AngularFirestore,public auth: AuthServiceService,
    public toastController: ToastController, public ac: AppComponent, public fAuth: AngularFireAuth) {
      this.ac.getMenu();
    this.room= this.bs.selectedOption;
    this.totalPrice= this.bs.fullPrice;
    this.cancelDate= new Date(new Date(this.bs.reservation.checkIn).getDate() -1);
   }

  ngOnInit() {}

  async bookReservation(){
    this.fAuth.authState.subscribe(user => {
      if(user){
        const ownerId = user.uid;
        this.reservationCollectionRef = this.fs.collection('reservation');
        // eslint-disable-next-line object-shorthand
        this.reservationCollectionRef.add({ownerId: ownerId,checkIn: this.bs.reservation.checkIn,
        checkOut: this.bs.reservation.checkOut, status:'pending', adults:this.bs.reservation.adults,
        kids:this.bs.reservation.kids, totalPrice:this.totalPrice, maxKidsAge:this.bs.reservation.maxKidsAge,
        roomType:this.room.roomType, maxCapacity:this.room.maxCapacity, room:this.room.roomNumber,
        roomPrice:this.room.price}).then(async ()=>{
          const toast = await this.toastController.create({
          message: 'Your reservation has been saved, once the payement is settled you will receive an email',
          duration: 2000
          });
          toast.present();
        }).then(()=>{
          this.bs.delay(2000).then(()=>{
            this.router.navigateByUrl('/home');
          });
        });
      }});
  }
}

