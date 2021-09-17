import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { RoomService } from '../Services/room.service';
import { BookingService } from '../Services/booking.service';
import { Room } from '../models/room';
import { AppComponent } from '../app.component';
@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.page.html',
  styleUrls: ['./rooms.page.scss'],
})
export class RoomsPage implements OnInit {

  public rooms: Array<Room>= [];
  public roomIds: Array<string>= [];

  constructor(public rs: RoomService, public bs: BookingService, public ac: AppComponent, public location: Location) {
    this.ac.getMenu();
    this.rs.getRooms();
    this.bs.delay(2000).then(()=>{
      this.rooms=this.rs.allRooms;
      this.roomIds= this.rs.allRoomsIds;
    });
  }

  ngOnInit() {
  }

  updateRoom(i: number){
    this.rs.preUpdateRoom(i);
  }

  deleteRoom(i: number){
    this.rs.deleteRoom(i);
  }

  goBack(){
    this.location.back();
  }
}
