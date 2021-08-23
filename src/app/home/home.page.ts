/* eslint-disable @typescript-eslint/naming-convention */
import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { BookpopoverPage } from '../bookpopover/bookpopover.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private popover: PopoverController) {}

  OpenPopover(){
    this.popover.create({component:BookpopoverPage,
      showBackdrop:false}).then((popoverElement)=>{
        popoverElement.present();
      });
  }
}
