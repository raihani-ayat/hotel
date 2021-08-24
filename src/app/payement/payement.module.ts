import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PayementPageRoutingModule } from './payement-routing.module';
import { ComponentsModule } from '../components/components.module';

import { PayementPage } from './payement.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayementPageRoutingModule,
    ComponentsModule
  ],
  declarations: [PayementPage]
})
export class PayementPageModule {}
