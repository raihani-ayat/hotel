/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable @typescript-eslint/prefer-for-of */
import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';
import { Room } from '../models/room';
import { Reservation } from '../models/reservation';
import { AuthServiceService } from './auth-service.service';
import { AngularFireStorage} from '@angular/fire/storage';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';




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
  ims: Array<Array<any>>= [];
  infoRoom: Room;
  infoRoomImgs: Array<any>= [];
  paymentAmount: string = '3.33';
  currency: string = 'USD';

  constructor(public afs: AngularFirestore, public auth: AuthServiceService, public storage: AngularFireStorage,
    private payPal: PayPal) {
   }

 findRoom(reservation: Reservation, totalPeople: number){
        // eslint-disable-next-line prefer-const
        let promise= new Promise(()=>{
          this.roomsAvIds.length=0;
          this.ims=[];
          this.afs.collection<Room>('rooms')
            .get().toPromise().then((snapshot)=>{
              snapshot.forEach((doc)=>{
                if(reservation.roomType==='any'){
                  if(totalPeople<doc.data().maxCapacity && reservation.maxKidsAge>=doc.data().maxKidsAge ){
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
              this.roomsAvIds.forEach(()=>{
                this.ims.push([]);
              });
              for(let i=0; i<this.roomsAvIds.length; i++){
                this.storage.ref('/fileStorage/').listAll().toPromise().then(
                  (resp)=>{
                    resp.items.forEach((im)=>{
                      if(im.name.startsWith(`${this.roomsAvIds[i].roomNumber}_`)){
                        this.ims[i].push(im.getDownloadURL());
                      }
                    });
                  }
                );
              }
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

    showRoomInfo(room: Room){
      this.infoRoom= room;
      this.storage.ref('/fileStorage/').listAll().toPromise().then(
        (resp)=>{
          resp.items.forEach((im)=>{
            if(im.name.startsWith(`${room.roomNumber}_`)){
              this.infoRoomImgs.push(im.getDownloadURL());
            }
          });
        }
      );
    }

    payWithPaypal() {
      this.payPal.init({
        PayPalEnvironmentProduction: 'YOUR_PRODUCTION_CLIENT_ID',
        PayPalEnvironmentSandbox: 'ASITIxNAAR_0B3PiE6vkOvs2Cz522XOehhm28MIzKuQi0hEN8wWj--I9xOrQjRxq2MDnAJDC5eW_XpsM'
      }).then(() => {
        this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
        })).then(() => {
          let payment = new PayPalPayment(this.paymentAmount, this.currency, 'Description', 'sale');
          this.payPal.renderSinglePaymentUI(payment).then((res) => {
            console.log(res);
            console.log('successful payment');
          }, () => {
            console.log('payement unsuccsseful');
          }).catch((error)=>{
            console.log(error);
          });
        }, () => {
          console.log('configiration error');
        }).catch((error)=>{
          console.log(error);
        });
      }, () => {
        console.log('initialization error');
      });
    }

  }

