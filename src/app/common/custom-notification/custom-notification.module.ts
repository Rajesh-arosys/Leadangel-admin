import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomNotificationComponent } from './custom-notification.component';

import { SimpleNotificationsModule } from 'angular2-notifications';


@NgModule({
  imports: [
    CommonModule,
    SimpleNotificationsModule.forRoot(),
    
    
  ],
  declarations: [CustomNotificationComponent],
  exports: [CustomNotificationComponent]

})
export class CustomNotificationModule { }
