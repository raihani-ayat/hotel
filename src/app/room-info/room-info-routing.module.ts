import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoomInfoPage } from './room-info.page';

const routes: Routes = [
  {
    path: '',
    component: RoomInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoomInfoPageRoutingModule {}
