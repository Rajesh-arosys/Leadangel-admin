import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeadangeladminRoutingModule } from './leadangeladmin-routing.module';
import { LeadangeladminComponent } from './leadangeladmin.component';
import { LeftnavbarComponent } from './leftnavbar/leftnavbar.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatButtonModule, MatIconModule, MatListModule, MatMenuModule, MatToolbarModule } from '@angular/material';
import { HTTP_INTERCEPTORS ,HttpClientModule} from '@angular/common/http';
import { AdminInterceptorService } from '../httpinterceptor/admin-interceptor.service';
import { CustomNotificationModule } from '../common/custom-notification/custom-notification.module';


@NgModule({
  declarations: [LeadangeladminComponent, LeftnavbarComponent],
  imports: [
    CommonModule,
    LeadangeladminRoutingModule,
    MatSidenavModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    HttpClientModule,
    CustomNotificationModule
  
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AdminInterceptorService, multi: true},
    
  ],
})
export class LeadangeladminModule { }
