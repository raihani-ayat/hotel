export class Reservation{
  id: string;
  ownerId: string;
  roomNumber: string;
  checkIn: Date;
  checkOut: Date;
  status: string;
  adults: number;
  kids: number;
  maxKidsAge: number;
  roomType: string;
}
