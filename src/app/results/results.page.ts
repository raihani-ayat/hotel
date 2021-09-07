import { Component, OnInit } from '@angular/core';
import { BookingService } from '../Services/booking.service';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument,AngularFirestoreCollection } from '@angular/fire/firestore';
import { Room } from '../models/room';
import { ToastController } from '@ionic/angular';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements OnInit {
public results = [];
public reservation;
public selected;
public roomDoc: AngularFirestoreDocument<Room>;
public room= new Room();
public totalPrice = 0;
public totalPeople: number;
searching= false;


  constructor(public bs: BookingService,public router: Router, public fs: AngularFirestore, public toastController: ToastController,
    public ac: AppComponent ) {
      this.ac.getMenu();
      this.reservation= this.bs.reservation;
        this.results=this.bs.results;
    }

  ngOnInit() {}

  async validate(){
    if(this.reservation.checkIn===undefined || this.reservation.checkOut===undefined || this.reservation.kids===undefined
      || this.reservation.adults===undefined || this.reservation.roomType===undefined){
          const toast = await this.toastController.create({
            message: 'Please fill all the required fields!',
            duration: 2000
          });
          toast.present();
      }
      else{
        const checkIn= new Date(this.reservation.checkIn).valueOf();
        const checkOut = new Date(this.reservation.checkOut).valueOf();
        const diff = Math.abs(new Date(this.reservation.checkOut).getTime() - new Date(this.reservation.checkIn).getTime());
        const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
        if(checkOut<checkIn || diffDays===1){
          const toast = await this.toastController.create({
            message: 'The check out date must be later then the check in date!',
            duration: 2000
          });
          toast.present();
        }
        else{
          if(this.reservation.kids.toString() !== '0'  && this.reservation.maxKidsAge===undefined){
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

  async showResults(){
    this.searching = true;
    const adults= Number(this.reservation.adults);
    const kids= Number(this.reservation.kids);
    this.bs.reservation= this.reservation;
    this.totalPeople= adults+kids;
     this.bs.findRoom(this.reservation, this.totalPeople);
     this.bs.delay(3000).then(()=> {
       this.searching=false;
       this.results=this.bs.results;
       console.log(this.results);
       this.router.navigateByUrl('/results');

      }
     );

  }

  async payment(){
    if(Object.keys(this.room).length !== 0){
      this.bs.selectedOption=this.room;
      this.bs.fullPrice=this.totalPrice;
      this.bs.reservation.roomType=this.room.roomType;
      this.router.navigateByUrl('/payement');
    }
    else{
      const toast = await this.toastController.create({
        message: 'Choose an option to proceed to payment!',
        duration: 2000
        });
        toast.present();
    }
  }

  update(){
    const diff = Math.abs(new Date(this.reservation.checkOut).getTime() - new Date(this.reservation.checkIn).getTime());
    const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    this.fs.collection<Room>('rooms')
          .get().toPromise().then((snapshot)=>
          snapshot.forEach((doc)=>{
            if(doc.data().id===this.selected){
              this.room=doc.data();
              this.totalPrice=Number(doc.data().price)*diffDays;
            }
          }));
    }


}


//public r: Observable<Room>;
//public ref: AngularFirestoreCollection<Room>;
/*this.roomDoc= this.fs.doc<Room>('rooms/d9nnxT1iugBAjr6zi5CX');
  this.r= this.roomDoc.valueChanges();
 console.log(this.r);
 console.log(this.selected)*/
 //this.room= this.fs.collection<Room>('rooms',ref =>ref.where('id','==',this.selected).limit(1)).valueChanges();

