import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserReservationsPage } from './user-reservations.page';

const routes: Routes = [
  {
    path: '',
    component: UserReservationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserReservationsPageRoutingModule {}
