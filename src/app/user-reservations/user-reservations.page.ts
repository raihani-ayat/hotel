import { Component, OnInit } from '@angular/core';
import { Reservation } from '../models/reservation';
import { BookingService } from '../Services/booking.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthServiceService } from '../Services/auth-service.service';


@Component({
  selector: 'app-user-reservations',
  templateUrl: './user-reservations.page.html',
  styleUrls: ['./user-reservations.page.scss'],
})
export class UserReservationsPage implements OnInit {
myReservations: Array<Reservation>;
myReservationsIds: Array<string>;
uid;
public reservationCollectionRef: AngularFirestoreCollection<Reservation>;

  constructor(public bs: BookingService, public auth: AngularFireAuth,public afs: AngularFirestore
    ,public toastController: ToastController, public router: Router, public aut: AuthServiceService ) {
      console.log(this.aut.authed);
    this.reservationCollectionRef = this.afs.collection('reservation');
    this.auth.authState.subscribe(user=>{
      if(user){
        this.uid=user.uid;
        this.bs.getUserReservations(user.uid);
        this.bs.delay(1500).then(()=>{
          this.myReservations=this.bs.userReservations;
          this.myReservationsIds= this.bs.userReservationsIds;
        });
      }
    });

   }

  ngOnInit() {
  }

async delete(item){
  const docId= this.myReservationsIds[item];
  this.reservationCollectionRef.doc(docId).delete().then(async ()=>{
    const toast = await this.toastController.create({
      message: 'Reservation successfully deleted',
      duration: 2000
      });
      toast.present();
  });
  }
}
