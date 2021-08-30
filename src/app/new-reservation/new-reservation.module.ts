import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';

import { IonicModule } from '@ionic/angular';

import { NewReservationPageRoutingModule } from './new-reservation-routing.module';

import { NewReservationPage } from './new-reservation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewReservationPageRoutingModule,
    ComponentsModule
  ],
  declarations: [NewReservationPage]
})
export class NewReservationPageModule {}
