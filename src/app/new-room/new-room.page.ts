import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Room } from '../models/room';
import { RoomService } from '../Services/room.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
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
  fileUploadTask: AngularFireUploadTask;
  images: FileList;


  constructor(public rs: RoomService,public afs: AngularFirestore,public toastController: ToastController,
    public bs: BookingService , public ac: AppComponent, public location: Location,     private afStorage: AngularFireStorage) {
      this.ac.getMenu();
     }

  ngOnInit() {
  }

  add(room: Room){
    for(let i=0; i<this.images.length; i++){
      const file= this.images.item(i);
      const imgName= file.name;
      const fileStoragePath= `fileStorage/${this.newRoom.roomNumber}_${imgName}`;
      const imageRef= this.afStorage.ref(fileStoragePath);
      const uploadUrl= imageRef.getDownloadURL();
      this.fileUploadTask= this.afStorage.upload(fileStoragePath,file);
      this.fileUploadTask.snapshotChanges().toPromise()
      .then(
        ()=>{
          this.rs.addRoom(room);
        }
      );

    }
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
              this.add(room);
            });
          }
      });
      }
    }

    goBack(){
      this.location.back();
    }

    uploadImages(event: Event, room: Room){
        const target = event.target as HTMLInputElement;
        this.images = target.files as FileList;
        console.log(this.images);
    }

}
