import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForgottenPasswordPageRoutingModule } from './forgotten-password-routing.module';

import { ForgottenPasswordPage } from './forgotten-password.page';

import { ComponentsModule } from '../components/components.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForgottenPasswordPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ForgottenPasswordPage]
})
export class ForgottenPasswordPageModule {}
