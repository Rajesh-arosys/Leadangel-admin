import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { catchError } from 'rxjs/operators';
import { Observable,throwError as observableThrowError } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ForgotpassComponent } from './forgotpass.component'

import ConfigData from '../../../assets/config.json'

@Injectable({
  providedIn: 'root'
})
export class ForgotpassService {

  public headers;
  public options;
  public apiUrl;
  
  
  public ConfigData: any = ConfigData

  constructor(private dialog: MatDialog,public httpClient: HttpClient) { 
  }
  dialogRef: MatDialogRef<ForgotpassComponent>

  public open(options) {
    console.log('I am inside Dialog Service ',options)
    this.dialogRef = this.dialog.open(ForgotpassComponent, {    
         data: {
           title      : options.title,
           message    : options.message,
           cancelText : options.cancelText,
           confirmText: options.confirmText,
           dialogtype : options.dialogtype,
         },
         disableClose: true,
         width:"450px",
    });
  }  

  public confirmed(): Observable<any> {
    
    return this.dialogRef.afterClosed().pipe(take(1), map(res => {
        
        return res;
      }
    ));
  }


  



}
