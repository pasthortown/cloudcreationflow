import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MainPageRoutingModule } from './main-page-routing.module';
import { MainPageComponent } from './main-page.component';
import { RequestsComponent } from './components/requests/requests.component';
import { RequestComponent } from './components/request/request.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { CatalogService } from 'src/app/services/catalog.service';

@NgModule({
  imports: [CommonModule, MainPageRoutingModule, FormsModule, NgbModule, NgxFileDropModule],
  declarations: [MainPageComponent, RequestsComponent, RequestComponent],
  providers: [CatalogService],
})
export class MainPageModule {}
