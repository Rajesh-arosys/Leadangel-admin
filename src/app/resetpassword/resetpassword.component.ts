import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomValidators } from 'src/app/resetpassword/custom-validators';
import { AdminLoginService } from '../adminlogin/admin-login.service';

import { LoginService } from '../login/login.service';
import { ResetpasswordService } from './resetpassword.service';
export class changePasswordmodel {

  PasswordM:string
  ConfirmPasswordM:string
}

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss'],
  providers:[changePasswordmodel]
  
})
export class ResetpasswordComponent implements OnInit {
  
  public role:string;
  public roleTpye:boolean;
  public ID:any;
  public AdminStatus:string;
  public ClientID:any
  public resetForm:FormGroup
  public updatePasswordAPIdata
  constructor(  
    public changepassservice:ResetpasswordService, public changepassmodel:changePasswordmodel,
    private fb: FormBuilder,
    public router:Router, public route:ActivatedRoute,
    public leadangelAdminService:AdminLoginService,
    public clientLoginService:LoginService
    ) { 
      this.resetForm = this.Createresetform();
      this.resetForm.controls.password.valueChanges.subscribe(
        x=>this.resetForm.controls.confirmPassword.updateValueAndValidity()
      )
    }

  ngOnInit() {
    this.ID = this.route.snapshot.paramMap.get('ID');
    let expr='@'
    if(this.ID.search(expr)=== -1){
      this.role="Admin"
    }
    else{
      this.role="Client"
      this.ClientID=this.ID.substring(this.ID.search(expr)+1)
    }
      let getVyakarAdminResetPasswordStatusAPIdata = {
        "resetpwdlink":this.ID
      }
      this.changepassservice.leadangelAdminResetPasswordStatus(getVyakarAdminResetPasswordStatusAPIdata).subscribe(res=>{
        console.log('success',res.success)
        this.AdminStatus=res.success
      })
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
              Validators.minLength(8),
              
            ])
          ],
          confirmPassword: [null, Validators.compose([Validators.required])]
        },
        {
          validators:CustomValidators.passwordMatchValidator
        }
      )

    };
    

      onSavePassword = () =>{
        //console.log(this.changepassmodel)
        if(this.role=='Admin'){
          let updateVyakarAdminPasswordAPIdata = {
            "resetpwdlink":this.ID,
            "newpassword":this.changepassmodel.ConfirmPasswordM,
          }
          console.log('role==Admin ',updateVyakarAdminPasswordAPIdata)
          this.changepassservice.updateLeadangelAdminPasswordServiceCall(updateVyakarAdminPasswordAPIdata).subscribe(res=>{
            if(res.success=="true"){
              //this.AdminStatus=res.resetPasswordStatus
              console.log(res.emailaddress)
              
                // this.router.navigate(['/vyakar-login']);
    
                let loginVyakarAdminAPIdata = {
                  "emailaddress":res.emailaddress,
                  "password":this.changepassmodel.ConfirmPasswordM,
                  "clientid" : 0
                }
                this.leadangelAdminService.loginCheck(loginVyakarAdminAPIdata).subscribe(res=>{
                  console.log('res',res)
                  if(res.status=="true"){
                    // localStorage.setItem('firstName', res.data.firstname);
                    // localStorage.setItem('lastName', res.data.lastname);
                    // localStorage.setItem('userEmailAddress', res.data.EmailAddress);
                    // localStorage.setItem('role', res.data.role);
                    // localStorage.setItem('token', res.data.UserToken);


                    sessionStorage.setItem('firstname',res.data.firstname);
                    sessionStorage.setItem('lastname', res.data.lastname);
                    sessionStorage.setItem('clientid', '0');
                    sessionStorage.setItem('role', res.data.role);
                    sessionStorage.setItem('emailaddress', res.data.EmailAddress);
                    sessionStorage.setItem('token', res.data.UserToken);
                    sessionStorage.setItem('LoginType','adminlogin');

                    sessionStorage.setItem('vyakaradminid',res.data.vyakaradminid);
                    this.router.navigate(['leadangeladmin/leadangeluserlist'])
                  }
                  else if(res.status=="fail"){
                   
                  }
                })
            }
          })
        }
        else if(this.role=='Client'){
          let updateClientAdminUserPasswordAPIdata = {
            "resetpwdlink":this.ID,
            "newpassword":this.changepassmodel.ConfirmPasswordM,
          }
          console.log('role==Client ',updateClientAdminUserPasswordAPIdata)

          this.changepassservice.updateclientPasswordServiceCall(updateClientAdminUserPasswordAPIdata).subscribe(res=>{
            if(res.success=="true"){
             // console.log(res.emailaddress)
              let clientLoginAPIData = {
                "clientid":this.ClientID,
                "emailaddress":res.emailaddress,
                "password":this.changepassmodel.ConfirmPasswordM,
              }
          
              this.clientLoginService.loginCheck(clientLoginAPIData).subscribe(res=>{
                console.log('res',res)
                if(res.status=="true"){

                    localStorage.setItem('ClientfirstName', res.data.firstname.toString());
                    localStorage.setItem('ClientlastName', res.data.lastname.toString());
                    localStorage.setItem('clientid', this.ClientID.toString());
                    localStorage.setItem('role', res.data.role);
                    localStorage.setItem('emailaddress',  res.data.EmailAddress.toString());
                    localStorage.setItem('token', res.data.UserToken);
                    localStorage.setItem("LoginType", "commonlogin");
            
                    localStorage.setItem('clientUserId', res.data.clientUserId);
                    localStorage.setItem("clientPartnerId", res.data.clientPartnerID)

                    this.router.navigate(["/dashboard"]);
                 
                }
                else if(res.status=="fail"){
                
                }
              })
            }
          })
        }
      }

      onCancel(){
        this.router.navigate(["/"])
      }

}
