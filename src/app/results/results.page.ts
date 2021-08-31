import { Component, OnInit } from '@angular/core';
import { BookingService } from '../Services/booking.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements OnInit {
public results;
public reservation;
public selected;

  constructor(public bs: BookingService, public router: Router) {
      this.results= this.bs.rooms;
      this.reservation= this.bs.reservation;
   }

  ngOnInit() {
  }

  payment(){
    this.router.navigateByUrl('/payement');
    console.log(this.selected);
  }

}
