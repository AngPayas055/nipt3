import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './shared.component';
import { FooterComponent } from 'src/app/components/shared/components/layout/footer/footer.component';

@NgModule({
  declarations: [
    SharedComponent,
    FooterComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FooterComponent
  ]
})
export class SharedModule { }
