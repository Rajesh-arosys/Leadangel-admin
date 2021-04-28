import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminloginRoutingModule } from './adminlogin-routing.module';
import { AdminloginComponent } from './adminlogin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox'
import { HTTP_INTERCEPTORS,HttpClientModule } from '@angular/common/http';
import { AdminInterceptorService } from '../httpinterceptor/admin-interceptor.service';
import { CustomNotificationModule } from '../common/custom-notification/custom-notification.module';
  
@NgModule({
  declarations: [AdminloginComponent],
  imports: [
    CommonModule,
    AdminloginRoutingModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    HttpClientModule,
    CustomNotificationModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AdminInterceptorService, multi: true},
    
  ],
})
export class AdminloginModule { }
