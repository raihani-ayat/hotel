import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';

import { IonicModule } from '@ionic/angular';

import { UserReservationsPageRoutingModule } from './user-reservations-routing.module';

import { UserReservationsPage } from './user-reservations.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserReservationsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [UserReservationsPage]
})
export class UserReservationsPageModule {}
