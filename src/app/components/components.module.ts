import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [FooterComponent,HeaderComponent],
  imports: [
    CommonModule
  ],
  exports:[FooterComponent,HeaderComponent],
})
export class ComponentsModule { }
