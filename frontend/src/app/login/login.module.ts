import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { LeftSectionComponent } from './components/left-section/left-section.component';
import { RightSectionComponent } from './components/right-section/right-section.component';

@NgModule({
    imports: [
      CommonModule,
      LoginRoutingModule,
      FormsModule,
      NgbModule
    ],
    declarations: [LoginComponent, LeftSectionComponent, RightSectionComponent],
    providers: []
})
export class LoginModule {}
