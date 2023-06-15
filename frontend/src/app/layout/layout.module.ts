import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { NavbarComponent } from '../components/navbar/navbar.component';

@NgModule({
    imports: [
      CommonModule,
      LayoutRoutingModule
    ],
    declarations: [LayoutComponent, NavbarComponent],
    providers: []
})
export class LayoutModule {}
