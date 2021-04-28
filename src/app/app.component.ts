import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SharedService } from './common/shared.service';

import { ConnectionService } from 'ng-connection-service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ForgotpassService } from './common/forgotpass/forgotpass.service';


export let browserRefresh = false

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  subscription: Subscription
  status:string;
  isConnected :boolean;

  constructor(
    private sharedService: SharedService,
    public router: Router,
    public dailog: MatDialog,
    public connectionService:ConnectionService,
    public forgotdialog: ForgotpassService,
    ) {

      this.connectionService.monitor().subscribe(isConnected => {
        this.isConnected = isConnected;
        if (this.isConnected) {
          this.status = "ONLINE";
          this.dailog.closeAll();
        }
        else {
          this.status = "OFFLINE";
          this.forgotpass('Disconnected')
        
        }
  
        console.log('this.status',this.status)
      })



      // console.log(' router ',router)
      // if(!this.router.url.includes("change-password")){
      //   
      // }
      // this.router.navigate(['/dashboard'])
    this.sharedService.loadConfigData()
    
  }

  forgotpass(action:"Disconnected") {
    let options: any
    options = {
      title: '',
      message: 'Please enter your email to request password reset link. For valid email, we will send an encrypted link to reset password ',
      cancelText: 'Cancel',
      confirmText: 'Request Password reset link',
      dialogtype: action
    };

    this.forgotdialog.open(options)

    this.forgotdialog.confirmed().subscribe(confirmed => {
     
    })
  
  }

}
