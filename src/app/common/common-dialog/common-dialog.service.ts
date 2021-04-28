import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { CommonDialogComponent } from './common-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class CommonDialogService {

  constructor(private dialog: MatDialog) { }
  dialogRef: MatDialogRef<CommonDialogComponent>

  public open(options) {
    console.log("-----------------")
    console.log(options.width)

    let widthSize = '450px';
    if(options.width == 'extra'){
      widthSize = '650px';
    }
    this.dialogRef = this.dialog.open(CommonDialogComponent, {    
         data: {
           title: options.title,
           message: options.message,
           cancelText: options.cancelText,
           confirmText: options.confirmText,
           dialogtype : options.dialogtype,
           description:options.description,
           parentdata : options.parentdata,
         //  descrptiondata:options.descrptiondata
         },
         disableClose: true,
        
         width:widthSize,
    });
  }

  public confirmed(): Observable<any> {
    
    return this.dialogRef.afterClosed().pipe(take(1), map(res => {
        
        return res;
      }
    ));
  }
}
