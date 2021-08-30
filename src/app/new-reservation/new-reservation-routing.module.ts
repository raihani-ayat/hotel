import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewReservationPage } from './new-reservation.page';

const routes: Routes = [
  {
    path: '',
    component: NewReservationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewReservationPageRoutingModule {}
