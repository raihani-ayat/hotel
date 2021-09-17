import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoomInfoPageRoutingModule } from './room-info-routing.module';

import { RoomInfoPage } from './room-info.page';

import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoomInfoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [RoomInfoPage]
})
export class RoomInfoPageModule {}
