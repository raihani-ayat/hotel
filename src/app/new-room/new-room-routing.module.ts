import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewRoomPage } from './new-room.page';

const routes: Routes = [
  {
    path: '',
    component: NewRoomPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewRoomPageRoutingModule {}
