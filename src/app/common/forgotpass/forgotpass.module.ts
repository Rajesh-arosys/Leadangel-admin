import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotpassComponent } from './forgotpass.component';
import { MatButtonModule, MatDialogModule,MatCardModule,MatIconModule,MatListModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgotpassService } from '../forgotpass/forgotpass.service';
import { CustomNotificationModule } from '../custom-notification/custom-notification.module';


@NgModule({
  declarations: [ForgotpassComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    MatCardModule,
    ReactiveFormsModule,
    MatIconModule,
    MatListModule,
    CustomNotificationModule
    
    

  ],
  exports:[ ForgotpassComponent],
  entryComponents:[ForgotpassComponent],
  providers:[ForgotpassService]
})
export class ForgotpassModule { }
