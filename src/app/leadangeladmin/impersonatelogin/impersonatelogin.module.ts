import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import {
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule} 
from '@angular/material';

import {MatCardModule} from '@angular/material';

import { ImpersonateloginRoutingModule } from './impersonatelogin-routing.module';
import { ImpersonateloginComponent } from './impersonatelogin.component';
import { ImpersonateService } from './impersonate.service';
import { CustomNotificationModule } from 'src/app/common/custom-notification/custom-notification.module';

// import { SelectDropDownModule } from 'ngx-select-dropdown'


@NgModule({
  declarations: [ImpersonateloginComponent],
  imports: [
    
    CommonModule,
    ImpersonateloginRoutingModule,
    MatSelectModule,
    // SelectDropDownModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    CustomNotificationModule
    
  ],
  providers:[ImpersonateService],
})
export class ImpersonateloginModule { }
