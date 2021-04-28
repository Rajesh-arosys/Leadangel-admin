import { Component, OnInit, ChangeDetectionStrategy, HostListener, Inject, Output  } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators,FormControl } from '@angular/forms';
// import { ForgotpassService } from './forgotpass.service';
import { CustomValidators } from 'src/app/resetpassword/custom-validators';
import { CustomNotificationComponent } from '../custom-notification/custom-notification.component';
import { ResetpasswordService } from 'src/app/resetpassword/resetpassword.service';

export class changePasswordConfirmationModel {

  PasswordM:string
  ConfirmPasswordM:string
}
@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.scss'],
  providers:[CustomNotificationComponent,changePasswordConfirmationModel]
})
export class ForgotpassComponent implements OnInit {
  emailpattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$";
  public Notification={
    showSuccess    : 'NO',
    showError      : 'NO',
    title          : '',
    content        : '',
    position       : [],
    timeOut        : 0,
    showProgressBar: true,
    pauseOnHover   : true,
    clickToClose   : true,
  };
  public dialogDefinedData: any;
  public updatePasswordAPIdata;
  form = new FormGroup({
    clientId: new FormControl('', [Validators.required ]),
    emailId: new FormControl('', [Validators.required,Validators.pattern(this.emailpattern),])

   });
   resetForm:FormGroup

  constructor(
    private fb: FormBuilder,
    public changepassmodel: changePasswordConfirmationModel,
    public changepassservice:ResetpasswordService,
    @Inject(MAT_DIALOG_DATA) public data: {
    
    cancelText : string,
    confirmText: string,
    message    : string,
    title      : string,
    dialogtype : string
  }, private mdDialogRef: MatDialogRef<ForgotpassComponent>) {
    this.resetForm = this.Createresetform();
    this.resetForm.controls.password.valueChanges.subscribe(
      x=>this.resetForm.controls.confirmPassword.updateValueAndValidity()
    )
   }

  ngOnInit() {
    if(this.data.dialogtype=='forgetPassAdmin'){
      this.form.get('clientId').setValue('0')
    }
  }

  // forget password client admin both
  onSubmit(){
    console.log('dialog data ',this.data)
    console.log('this.form.value ',this.form.value.emailId)
    let string = this.form.value.emailId
    let lowerString = string.toLowerCase( )
    if(this.data.dialogtype=="forgetPassClient" || this.data.dialogtype=="forgetPassAdmin"){
      let forgotPasswordVyakarAdminAPIdata = {
        "clientid"    : this.form.value.clientId,
        "emailaddress": lowerString
      }
    
    }else if(this.data.dialogtype=="forgetPassAdmin"){
    }

  }

  Createresetform(): FormGroup {
    return this.fb.group({
        password:[
          null,
          Validators.compose([
            Validators.required,
            CustomValidators.patternValidator(/\d/,{
              hasNumber: true
            }),
            CustomValidators.patternValidator(/[A-Z]/,{
              hasCapitalCase: true
            
            }),
            CustomValidators.patternValidator(/[a-z]/,{
              hasSmallCase: true
            
            }),

           
            Validators.minLength(8)

          ])
        ],
        confirmPassword: [null, Validators.compose([Validators.required])]
    },
    {
      validators:CustomValidators.passwordMatchValidator
    }
    )
    
  };
      
      // change password client admin both
  onSavePassword() {
    console.log('dialog data ',this.data)
    // console.log('Test',this.resetForm.value)
    // console.log('ConfirmPasswordM',this.changePasswordConfirmationModel.ConfirmPasswordM)
    // console.log('PasswordM',this.changePasswordConfirmationModel.PasswordM)
    if(this.data.dialogtype=="changePassClient"){
      this.updatePasswordAPIdata = {
        "clientid"      : localStorage.getItem('clientid'),
        "emailaddress"  : localStorage.getItem('emailaddress'),
        "x-access-token": localStorage.getItem('token'),
        "newpassword"   : this.changepassmodel.ConfirmPasswordM
      }
      console.log('updatePasswordAPIdata',this.updatePasswordAPIdata)
      this.changepassservice.ChangePassword(this.updatePasswordAPIdata).subscribe(res=>{
        console.log('res ',res)
        if (res.success == "true") {

          this.mdDialogRef.close(res);
        }
      })
    }else if(this.data.dialogtype=="changePassAdmin"){
      this.updatePasswordAPIdata = {
        "clientid"      : sessionStorage.getItem('clientid'),
        "emailaddress"  : sessionStorage.getItem('emailaddress'),
        "x-access-token": sessionStorage.getItem('token'),
        "newpassword"   : this.changepassmodel.ConfirmPasswordM
      }
      console.log('updatePasswordAPIdata',this.updatePasswordAPIdata)
      this.changepassservice.ChangePassword(this.updatePasswordAPIdata).subscribe(res=>{
        console.log('res ',res)
        if (res.success == "true") {

          this.mdDialogRef.close(res);
        }
      })
    }

  }


}
  