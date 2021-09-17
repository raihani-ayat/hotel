import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Room } from '../models/room';
import { AppComponent } from '../app.component';
import { BookingService } from '../Services/booking.service';

@Component({
  selector: 'app-room-info',
  templateUrl: './room-info.page.html',
  styleUrls: ['./room-info.page.scss'],
})
export class RoomInfoPage implements OnInit {

  public room= new Room();
  ims: Array<any>;
  constructor(public location: Location, public ac: AppComponent, public bs: BookingService)
  {   this.ac.getMenu();
      this.room=this.bs.infoRoom;
      this.ims= this.bs.infoRoomImgs;
  }

  ngOnInit() {
  }


  goBack(){
    this.location.back();
  }

}
