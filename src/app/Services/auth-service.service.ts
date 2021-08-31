import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  public authed = false;
  public uid: any;
  constructor( public router: Router ) { }
}
