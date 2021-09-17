import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Room } from '../models/room';
import { BookingService } from '../Services/booking.service';
import { RoomService } from '../Services/room.service';
@Component({
  selector: 'app-room-update',
  templateUrl: './room-update.page.html',
  styleUrls: ['./room-update.page.scss'],
})
export class RoomUpdatePage implements OnInit {
room= new Room();

  constructor(public rs: RoomService, public bs: BookingService, public location: Location) {
    this.room=this.rs.roomToUpdate;
   }

  ngOnInit() {
  }

  updateRoom(room: Room){
    this.rs.updateRoom(room);
  }

  goBack(){
    this.location.back();
  }
}
