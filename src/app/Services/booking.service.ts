/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable @typescript-eslint/prefer-for-of */
import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';
import { Room } from '../models/room';
import { Reservation } from '../models/reservation';
import { AuthServiceService } from './auth-service.service';



@Injectable({
  providedIn: 'root'
})
export class BookingService {

  reservation= new Reservation();
  results: Array<Room> =[];
  roomsAvIds: Array<Room> =[];
  selectedOption: Room;
  fullPrice: number;
  userReservations: Array<Reservation> =[];
  userReservationsIds: Array<string> =[];
  pendingReservation: Array<Reservation> =[];
  confirmedReservations: Array<Reservation> =[];
  totalReservations: Array<Reservation> =[];
  pendingReservationNumber= 0;
  confirmedReservationsNumber= 0;
  totalReservationsNumber= 0;

  constructor(public afs: AngularFirestore, public auth: AuthServiceService) {
   }

 findRoom(reservation: Reservation, totalPeople: number){
        // eslint-disable-next-line prefer-const
        let promise= new Promise(()=>{
          this.roomsAvIds.length=0;
          this.afs.collection<Room>('rooms')
            .get().toPromise().then((snapshot)=>{
              snapshot.forEach((doc)=>{
                if(reservation.roomType==='any'){
                  if(totalPeople<doc.data().maxCapacity && reservation.maxKidsAge<=doc.data().maxKidsAge ){
                    this.roomsAvIds.push(doc.data());
                  }
                }
                else{
                  if(reservation.roomType===doc.data().roomType && totalPeople<doc.data().maxCapacity
                  && reservation.maxKidsAge<=doc.data().maxKidsAge ){
                    this.roomsAvIds.push(doc.data());
                  }
                }
              });
            }).then(()=>{
              this.roomsAvIds.forEach(el=>{
                this.afs.collection<Reservation>('reservation',ref =>ref.where('room','==',el.id))
                .get().toPromise().then((snapshot)=>{
                  snapshot.forEach((doc)=>{
                    const startDate= new Date(doc.data().checkIn);
                    const endDate = new Date(doc.data().checkOut);

                    const resStartDate= new Date(reservation.checkIn);
                    const resEndDate= new Date(reservation.checkOut);
                    if(startDate<resEndDate && endDate>resStartDate ){
                      const index= this.roomsAvIds.indexOf(el);
                      this.roomsAvIds.splice(index,1);
                    }
                  });
                });
              });

            }).then(()=>{
              this.results=this.roomsAvIds;
            });
        });
            return promise;
    }

    delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }

    getUserReservations(uid){
      this.afs.collection<Reservation>('reservation',ref =>ref.where('ownerId','==',uid))
                .get().toPromise().then((snapshot)=>{
                  snapshot.forEach((doc)=>{
                    this.userReservations.push(doc.data());
                    this.userReservationsIds.push(doc.id);
                  });
                });
    }

    getBookingbyStatus(){
      this.pendingReservation=[];
      this.confirmedReservations=[];
      this.totalReservations=[];
      this.totalReservationsNumber=0;
      this.pendingReservationNumber=0;
      this.confirmedReservationsNumber=0;
      this.afs.collection<Reservation>('reservation')
                .get().toPromise().then((snapshot)=>{
                  snapshot.forEach((doc)=>{
                    this.totalReservationsNumber++;
                    this.totalReservations.push(doc.data());
                    if(doc.data().status==='pending'){
                      this.pendingReservationNumber++;
                      this.pendingReservation.push(doc.data());
                    }
                    if(doc.data().status==='confirmed'){
                      this.confirmedReservationsNumber++;
                      this.confirmedReservations.push(doc.data());
                    }
                  });
                });
    }

  }


//this.results= this.afs.collection<Reservation>('reservation').valueChanges();
/*this.afs.collection<Reservation>('reservation')
    .get().toPromise().then((snapshot)=>
    snapshot.forEach((doc)=>{
      const startDate= new Date(doc.data().checkIn);
      const endDate = new Date(doc.data().checkOut);

      const resStartDate= new Date(reservation.checkIn);
      const resEndDate= new Date(reservation.checkOut);

      if(reservation.roomType==='any'){
        if((startDate>resEndDate || endDate<resStartDate)
        && totalPeople<doc.data().maxCapacity && reservation.maxKidsAge<=doc.data().maxKidsAge ){
        this.results.push(doc.data());
        this.roomIds.push(doc.data().id);}
      }else{
        if((startDate>resEndDate || endDate<resStartDate)
        && reservation.roomType===doc.data().roomType && totalPeople<doc.data().maxCapacity
        && reservation.maxKidsAge<=doc.data().maxKidsAge ){
          this.results.push(doc.data());
        }
      }

    }));*/
/*this.roomsCollectionRef = this.afs.collection('rooms');
  roomsCollectionRef: AngularFirestoreCollection<Room>;
this.rooms= this.roomsCollectionRef.valueChanges();*/
