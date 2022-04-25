import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IngresoPageRoutingModule } from './ingreso-routing.module';

import { IngresoPage } from './ingreso.page';
import { Globals } from 'src/app/global';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IngresoPageRoutingModule
  ],
  declarations: [IngresoPage],
  providers: [Globals],
})
export class IngresoPageModule {}
