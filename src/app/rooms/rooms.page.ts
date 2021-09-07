import { Component, OnInit } from '@angular/core';
import { RoomService } from '../Services/room.service';
import { BookingService } from '../Services/booking.service';
import { Room } from '../models/room';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.page.html',
  styleUrls: ['./rooms.page.scss'],
})
export class RoomsPage implements OnInit {

  public rooms: Array<Room>= [];
  public roomIds: Array<string>= [];

  constructor(public rs: RoomService, public bs: BookingService) {
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
}
