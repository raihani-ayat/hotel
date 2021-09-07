/* eslint-disable @typescript-eslint/naming-convention */

export class Reservation{
  ownerId: string;
  checkIn: string;
  checkOut: string;
  status: string;
  adults: number;
  kids: number;
  totalPrice: number;

  //info about room
  maxKidsAge: number;
  roomType: string;
  maxCapacity: number;
  room: string; //room number
  roomPrice: number;
}
