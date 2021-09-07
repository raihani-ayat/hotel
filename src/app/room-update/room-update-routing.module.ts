import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoomUpdatePage } from './room-update.page';

const routes: Routes = [
  {
    path: '',
    component: RoomUpdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoomUpdatePageRoutingModule {}
