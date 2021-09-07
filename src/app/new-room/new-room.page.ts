import { Component, OnInit } from '@angular/core';
import { Room } from '../models/room';
import { RoomService } from '../Services/room.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController } from '@ionic/angular';
import { BookingService } from '../Services/booking.service';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-new-room',
  templateUrl: './new-room.page.html',
  styleUrls: ['./new-room.page.scss'],
})
export class NewRoomPage implements OnInit {
  public newRoom= new Room();

  constructor(public rs: RoomService,public afs: AngularFirestore,public toastController: ToastController,
    public bs: BookingService , public ac: AppComponent) {
      this.ac.getMenu();
     }

  ngOnInit() {
  }

  add(){
    this.rs.addRoom(this.newRoom);
  }

  async validate(room: Room){
    if(room.roomNumber=== undefined || room.maxKidsAge===undefined || room.maxCapacity===undefined
      || room.price===undefined || room.roomType===undefined){
        const toast = await this.toastController.create({
          message: 'Please fill all the required fields',
          duration: 2000
          });
          toast.present();
      }
      else{
        this.afs.collection('rooms',ref=>ref.where('id','==',room.roomNumber)).get().toPromise().then(async (res)=>{
          if(res.size>0){
            const toast = await this.toastController.create({
              message: 'This room already exists',
              duration: 2000
              });
              toast.present();
          }
          else{
            this.bs.delay(1000).then(()=>{
              this.rs.addRoom(room);
            });
          }
      });
      }

}

}
