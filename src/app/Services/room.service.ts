import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Room } from '../models/room';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { BookingService } from './booking.service';



@Injectable({
  providedIn: 'root'
})
export class RoomService {

allRooms: Array<Room> =[];
allRoomsIds: Array<string>=[];
roomToUpdate= new Room();
roomToUpdateId: string;
public roomCollectionRef: AngularFirestoreCollection<Room>;


  constructor(public router: Router, public afs: AngularFirestore,public toastController: ToastController,
    public bs: BookingService) {
      this.roomCollectionRef= this.afs.collection('rooms');
    }

  getRooms(){
    this.allRooms=[];
    this.allRoomsIds=[];
    this.afs.collection<Room>('rooms').get().toPromise().then(
      (snapshot)=>{ snapshot.forEach((doc)=>{
          this.allRooms.push(doc.data());
          this.allRoomsIds.push(doc.id);
        });
      });
    }

    async addRoom(room: Room){
          // eslint-disable-next-line object-shorthand
          this.roomCollectionRef.add({id:room.roomNumber, roomNumber: room.roomNumber, roomType:room.roomType,
            price: room.price, maxCapacity: room.maxCapacity, maxKidsAge:room.maxKidsAge
          }).then(async ()=>{
            const toast = await this.toastController.create({
            message: 'Room successfully added',
            duration: 2000
            });
            toast.present();
          }).then(()=>{
            this.bs.delay(1000).then(()=>{
              this.router.navigateByUrl('/admin-home');
            });
          });
        }

    preUpdateRoom(i: number){
      this.roomToUpdateId=this.allRoomsIds[i];
      this.roomToUpdate= this.allRooms[i];
      this.bs.delay(1000).then(()=>{
        this.router.navigateByUrl('/room-update');
      });
    }

    async updateRoom(room: Room){
      this.roomCollectionRef.doc(this.roomToUpdateId).update({roomNumber: room.roomNumber, roomType:room.roomType,
        price: room.price, maxCapacity: room.maxCapacity, maxKidsAge:room.maxKidsAge}).then(async ()=>{
          const toast = await this.toastController.create({
          message: 'Room successfully updated',
          duration: 2000
          });
          toast.present();
        }).then(()=>{
          this.bs.delay(1000).then(()=>{
            this.router.navigateByUrl('/rooms');
          });
        });
     }

     async deleteRoom(i: number){
       const id= this.allRoomsIds[i];
       this.roomCollectionRef.doc(id).delete().then(async ()=>{
        const toast = await this.toastController.create({
          message: 'Room successfully deleted',
          duration: 2000
          });
          toast.present();
          window.location.reload();

       });
     }

}
