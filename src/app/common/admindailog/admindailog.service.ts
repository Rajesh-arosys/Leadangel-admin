import { Injectable } from '@angular/core';
import { MatDialog,MatDialogRef } from '@angular/material';
import { AdmindailogComponent } from './admindailog.component';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
@Injectable({
    providedIn: 'root',
  })
  export class AadminDailogSevice {
    public dailogwidth='500px'
    constructor(private dailog:MatDialog) { }
    dialogRef: MatDialogRef<AdmindailogComponent>
    public open(options) {
      console.log('admin dialogue service ',options)
     // if dialog from lead angel user list - EDIT -  NEW
     if((options.dialogtype=='Edit'||options.dialogtype=='New'||options.dialogtype=='Delete'||options.dialogtype=='Reset')&&(options.popupFrom=='LeadangeluserlistComponent'||options.popupFrom=='ClientuserlistComponent')){
      this.dialogRef = this.dailog.open(AdmindailogComponent, { 
        data: {
          title      : options.title,
          cancelText : options.cancelText,
          confirmText: options.confirmText,
          dialogtype : options.dialogtype,
          message    : options.message,
          formdata   : options.formdata,
          dropdownOptions : options.dropdownOptions,
          popupFrom  : options.popupFrom
        },
        disableClose: true,
        width:'500px',
      });
    }

      // if dialog from manage client settings
      else if(options.dialogtype=='Setting'){
        this.dialogRef = this.dailog.open(AdmindailogComponent, { 
          data: {
            success    : options.success,
            title      : options.title,
            message    : options.message,
            cancelText : options.cancelText,
            confirmText: options.confirmText,
            dialogtype : options.dialogtype,
            data       : options.data,
            // popupFrom  : options.popupFrom
          },
          disableClose: true,
          width:'700px',
        });
      }
      // if dialog from user and access - Edit or New or Delete or Reset
      else if((options.dialogtype=='Edit'||options.dialogtype=='New'||options.dialogtype=='Delete'||options.dialogtype=='Reset')&&options.popupFrom=='UserAndAccessComponent'){
        this.dialogRef = this.dailog.open(AdmindailogComponent, { 
          data: {
            title      : options.title,
            message    : options.message,
            cancelText : options.cancelText,
            confirmText: options.confirmText,
            dialogtype : options.dialogtype,
            data       : options.data,
            popupFrom  : options.popupFrom
          },
          disableClose: true,
          width:'500px',
        });
      }
      // if dialog from lead detail report
      else if(options.dialogtype=='View'){
        console.log('options ',options)
        this.dialogRef = this.dailog.open(AdmindailogComponent, { 
          data: {
            title      : options.title,
            message    : options.message,
            cancelText : options.cancelText,
            confirmText: options.confirmText,
            dialogtype : options.dialogtype,
            data       : options.data,
            // popupFrom  : options.popupFrom
          },
          disableClose: true,
          width:'700px',
        });
      }
      // if dialog from srAccMapping - Edit or  Delete 
      else if((options.dialogtype=='Edit'||options.dialogtype=='Delete')&&options.popupFrom=='srAccMapping'){
        this.dialogRef = this.dailog.open(AdmindailogComponent, { 
          data: {
            title      : options.title,
            message    : options.message,
            cancelText : options.cancelText,
            confirmText: options.confirmText,
            dialogtype : options.dialogtype,
            data       : options.data,
            popupFrom  : options.popupFrom
          },
          disableClose: true,
          width:'500px',
        });
      }
      else if(options.popupFrom=='CrmdatarefreshComponent'){
        console.log('options ',options)
        this.dialogRef = this.dailog.open(AdmindailogComponent, { 
          data: {
            title:options.title,
            message: options.message,
            cancelText: options.cancelText,
            confirmText: options.confirmText,
            dialogtype: options.dialogtype,
            clientid:options.clientid,
            popupFrom:options.popupFrom,
            formdata: options.formdata
          },
          disableClose: true,
          width:'700px',
        });
      }
      else if(options.popupFrom=='newFeatureMenu'){
        console.log('options ',options)
        this.dialogRef = this.dailog.open(AdmindailogComponent, { 
          data: { 
            title:options.title,
            message: options.message,
            cancelText: options.cancelText,
            confirmText: options.confirmText,
            dialogtype: options.dialogtype,
            popupFrom:options.popupFrom
          },
          disableClose: true,
          width:'500px',
        });
      }

    }
    
    public confirmed(): Observable<any> {
      return this.dialogRef.afterClosed().pipe(take(1), map(res => {
        return res;
      }));
    }
  }