import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForgottenPasswordPage } from './forgotten-password.page';

const routes: Routes = [
  {
    path: '',
    component: ForgottenPasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForgottenPasswordPageRoutingModule {}
