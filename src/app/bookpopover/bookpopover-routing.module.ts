import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookpopoverPage } from './bookpopover.page';

const routes: Routes = [
  {
    path: '',
    component: BookpopoverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookpopoverPageRoutingModule {}
