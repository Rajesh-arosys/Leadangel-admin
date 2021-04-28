import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResetpasswordRoutingModule } from './resetpassword-routing.module';
import { ResetpasswordComponent } from './resetpassword.component';

import {MatCardModule,MatButtonModule,MatFormFieldModule,MatIconModule,MatInputModule,MatCheckboxModule,MatListModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ResetpasswordComponent],
  imports: [
    CommonModule,
    ResetpasswordRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ResetpasswordModule { }
  