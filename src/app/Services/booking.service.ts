import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Room } from '../models/room';
import { Reservation } from '../models/reservation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  roomsCollectionRef: AngularFirestoreCollection<Room>;
  reservationCollectionRef: AngularFirestoreCollection<Reservation>;
  result: any;
  room= new Room();
  reservation= new Reservation();
  rooms: Observable<Room[]>;
  reservations: Observable<Reservation []> ;

  constructor(public afs: AngularFirestore) {
    this.roomsCollectionRef = this.afs.collection('rooms');
    this.rooms= this.roomsCollectionRef.valueChanges();
   }

  findRoom(reservation: Reservation){
    console.log(reservation);
        }
}
