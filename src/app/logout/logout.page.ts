import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../Services/auth-service.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(public router: Router, public auth: AuthServiceService,
    public ac: AppComponent) { }

  ngOnInit() {
    this.auth.logout();
    this.router.navigateByUrl('login').then(()=>{
        this.ac.logout();
      });
  }

}
