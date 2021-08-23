import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookpopoverPageRoutingModule } from './bookpopover-routing.module';

import { BookpopoverPage } from './bookpopover.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    BookpopoverPageRoutingModule
  ],
  declarations: [BookpopoverPage]
})
export class BookpopoverPageModule {}
