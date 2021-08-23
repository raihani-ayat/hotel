import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-bookpopover',
  templateUrl: './bookpopover.page.html',
  styleUrls: ['./bookpopover.page.scss'],
})
export class BookpopoverPage implements OnInit {

  public myForm: FormGroup;
  public roomCount = 1;

  constructor( private popover: PopoverController, private formBuilder: FormBuilder) {
    this.myForm = formBuilder.group({
      room1: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  ClosePopover(){
    this.popover.dismiss();
  }

  addControl(){
    this.roomCount++;
    this.myForm.addControl('adultsroom' + this.roomCount, new FormControl('', Validators.required));
    this.myForm.addControl('kidsroom' + this.roomCount, new FormControl('', Validators.required));
  }

  removeControl(control){
    if(this.roomCount !== 1){
      this.roomCount--;
    }
    else{
      this.roomCount=1;
    }
    this.myForm.removeControl(control.key);
  }
}
