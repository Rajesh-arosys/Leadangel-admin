import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox'

import { ForgotpassModule } from '../common/forgotpass/forgotpass.module';
import { CustomNotificationModule } from '../common/custom-notification/custom-notification.module';
@NgModule({
  declarations: [LoginComponent,],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    ForgotpassModule,
    ReactiveFormsModule,
    CustomNotificationModule
    
  ]
})
export class LoginModule { }
