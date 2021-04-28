import { Component, OnInit, Input, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { Login, loginSuccessModel } from './login.model'
import { SharedService } from '../common/shared.service';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { ForgotpassService } from '../common/forgotpass/forgotpass.service';
import { MatDialog } from '@angular/material';
import { CustomNotificationComponent } from '../common/custom-notification/custom-notification.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [CustomNotificationComponent]
})
export class LoginComponent implements OnInit {

  public Notification = {
    showSuccess: 'NO',
    showError: 'NO',
    title: '',
    content: '',
    position: [],
    timeOut: 0,
    showProgressBar: true,
    pauseOnHover: true,
    clickToClose: true,
  };

  public loginSuccessModel = new loginSuccessModel()
  public loginModel: Login
  public breakpoint: number
  public loginForm: FormGroup
  public ssologinForm: FormGroup
  //public clientArray = ['1212','1213','1219','1001','1169','1002','1193']

  showTimeoutMsg = false
  timedOutMsg = ''


  //auto logout
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;

  constructor(private sharedService: SharedService,
    private loginService: LoginService,
    private router: Router,
    private fb: FormBuilder,
    public MatDialog: MatDialog,
    public forgotdialog: ForgotpassService,
    private cookieService: CookieService,
    private idle: Idle,
    private keepalive: Keepalive) {
    // sets an idle timeout of 5 seconds, for testing purposes.
    idle.setIdle(3590);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    idle.setTimeout(10);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() => {
      this.idleState = 'No longer idle.'
    });
    idle.onTimeout.subscribe(() => {
      let button
      this.idleState = 'Timed out!';
      this.timedOut = true;
      // this.sideNavService.getLogoutFrom('timeout')
      localStorage.removeItem('ClientfirstName');
      localStorage.removeItem('ClientlastName');
      localStorage.removeItem('clientid');
      localStorage.removeItem('role');
      localStorage.removeItem('emailaddress');
      localStorage.removeItem('token');
      localStorage.removeItem("LoginType");
      localStorage.removeItem('clientUserId');
      localStorage.removeItem("clientPartnerId")
  
      this.router.navigate(['/'])
      sessionStorage.clear();
    });
    idle.onIdleStart.subscribe(() => {
      this.idleState = 'You\'ve gone idle!'
    });
    // idle.onTimeoutWarning.subscribe((countdown) => {
    //   this.idleState = 'You will time out in ' + countdown + ' seconds!'
    //   this.sideNavService.getLogoutMsg(countdown)
    // });

    // sets the ping interval to 15 seconds
    keepalive.interval(1);

    // keepalive.onPing.subscribe(() => {
    //   this.lastPing = new Date()
    //   this.sideNavService.getLogoutMsg(false)
    // });

    this.reset();
  }

  ngOnInit() {
    
    if(Object.keys(this.router['currentUrlTree'].queryParams).length != 0 && this.router['currentUrlTree'].queryParams.status != undefined){
      console.log("gest11" , this.router['currentUrlTree'].queryParams.status);
      let message = "";  
      if(this.router['currentUrlTree'].queryParams.status==0){
          message = "You are not configured for sso";
      }else if(this.router['currentUrlTree'].queryParams.status==1){
           message = "You are not configured for sso";
      }
      this.Notification = {
        showSuccess: 'NO',
        showError: 'YES',
        title: 'Login Failed',
        content: message,
        position: ['top', 'right'],
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true,
      };
      
    }
    // console.log("login page")
    // this.sideNavService.buttonFrom.subscribe(data => {
    //   // console.log('data ',data)
    //   if (data == 'button') {
    //     this.showTimeoutMsg = false 
    //   } else if(data == 'Please provide your login credentials') {
    //     this.showTimeoutMsg = true
    //     this.timedOutMsg = 'We need to re-verify your credentials in order to proceed. Please enter your user name and password to continue.'
    //     localStorage.removeItem('ClientfirstName');
    //     localStorage.removeItem('ClientlastName');
    //     localStorage.removeItem('clientid');
    //     localStorage.removeItem('role');
    //     localStorage.removeItem('emailaddress');
    //     localStorage.removeItem('token');
    //     localStorage.removeItem("LoginType");
    //     localStorage.removeItem('clientUserId');
    //     localStorage.removeItem("clientPartnerId")
    //     this.router.navigate(['/'])
    //   } else if(data=='timeout'){
    //     this.showTimeoutMsg = true
    //     this.timedOutMsg = 'You were inactive from last 1 hour. You have logged out. Please Login to continue.'
    //   }
    // })

    const numericNumberReg = "^[0-9]*$";
    this.loginForm = this.fb.group({
      clientID: ['', [Validators.required, Validators.pattern(numericNumberReg)]],
      emailId: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false],
    });
    this.ssologinForm = this.fb.group({
      ssoClientID: ['', [Validators.required, Validators.pattern(numericNumberReg)]],
    });
    // if(localStorage.getItem('token') !== null){
    //   this.router.navigate(['/dashboard']) 
    // }

    if (this.cookieService.get('rememberMe') == 'YES') {
      this.loginForm = this.fb.group({
        clientID: [this.cookieService.get('clientID')],
        emailId: [this.cookieService.get('emailId')],
        password: [this.loginService.get('123456$#@$^@1ERF', this.cookieService.get("password"))],
        rememberMe: [true],
      });
    }
  }
  // auto logout
  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }

  public ssoOnLogin = () => {
      this.sharedService.clientId = this.loginForm.value.clientID
      this.sharedService.emailAddress = this.loginForm.value.emailId
      let loginApiCallBody = {
        "clientid"    : this.ssologinForm.value.ssoClientID
      }
      this.loginService.loginSSOCheck(loginApiCallBody).subscribe(res => {
        console.log(res)
        if(res.success == 1){
            this.loginService.ssoLoginRedirect();// window.location.href=;
        }else{
          this.Notification = {
            showSuccess: 'NO',
            showError: 'YES',
            title: 'Login Failed',
            content: res.message,
            position: ['top', 'right'],
            timeOut: 5000,
            showProgressBar: true,
            pauseOnHover: true,
            clickToClose: true,
          };       
        }
    })
  }

  public onLogin = () => {


    this.sharedService.clientId = this.loginForm.value.clientID
    this.sharedService.emailAddress = this.loginForm.value.emailId
    let loginApiCallBody = {
      "clientid"    : this.loginForm.value.clientID,
      "emailaddress": this.loginForm.value.emailId,
      "password"    : this.loginForm.value.password
    }
    //if(this.clientArray.includes(this.loginForm.value.clientID)){
    this.loginService.loginCheck(loginApiCallBody).subscribe(res => {
      console.log(res);
      // console.log('onLogin client')
      this.loginSuccessModel = res
      if (this.loginSuccessModel.status === "true") {

        let expiredDate = new Date();
        expiredDate.setDate(expiredDate.getDate() + 365)

        if (this.loginForm.value.rememberMe) {
          this.cookieService.set('clientID', this.loginForm.value.clientID, expiredDate);
          this.cookieService.set('emailId', this.loginForm.value.emailId, expiredDate);
          this.cookieService.set('password', this.loginService.set('123456$#@$^@1ERF', this.loginForm.value.password), expiredDate);
          this.cookieService.set('rememberMe', 'YES', expiredDate);
        } else {
          this.cookieService.delete('clientID');
          this.cookieService.delete('emailId');
          this.cookieService.delete('password');
          this.cookieService.delete('rememberMe');
        }
        this.reset();

        localStorage.setItem('ClientfirstName', res.data.firstname.toString());
        localStorage.setItem('ClientlastName', res.data.lastname.toString());
        localStorage.setItem('clientid', this.loginForm.value.clientID.toString());
        localStorage.setItem('role', res.data.role);
        localStorage.setItem('emailaddress',  res.data.EmailAddress.toString());
        localStorage.setItem('token', res.data.UserToken);
        localStorage.setItem('clientUserId', res.data.clientUserId);
        localStorage.setItem("clientPartnerId", res.data.clientPartnerID)
        localStorage.setItem("LoginType", "commonlogin");

        this.router.navigate(['/dashboard'])

        // setTimeout(() => {
         
        // }, 1000);  

        // notification define
        // this.Notification = {
        //   showSuccess: 'YES',
        //   showError: 'NO',
        //   title: 'Success',
        //   content: 'Login successfully',
        //   position: ['top', 'right'],
        //   timeOut: 5000,
        //   showProgressBar: true,
        //   pauseOnHover: true,
        //   clickToClose: true,
        // };
      }
      else {
        this.Notification = {
          showSuccess: 'NO',
          showError: 'YES',
          title: 'Login Failed',
          content: res.message || 'Please Enter Correct Credential',
          position: ['top', 'right'],
          timeOut: 5000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: true,
        };
      }
    })
   //}
  //  else{
  //   this.Notification = {
  //     showSuccess: 'NO',
  //     showError: 'YES',
  //     title: 'Login Failed',
  //     content: 'Please Enterl',
  //     position: ['top', 'right'],
  //     timeOut: 5000,
  //     showProgressBar: true,
  //     pauseOnHover: true,
  //     clickToClose: true,
  //   };
  //  }
  }


 
  forgotpass(action: string) {
    let options: any
    if (action == 'forgetPassClient') {
      options = {
        title      : '',
        message    : 'Please enter your email to request password reset link. For valid email, we will send an encrypted link to reset password ',
        cancelText : 'Cancel',
        confirmText: 'Request Password reset link',
        dialogtype : action
      };
    }
    this.forgotdialog.open(options)
    this.forgotdialog.confirmed().subscribe(confirmed => {
      console.log(confirmed)
      if (confirmed.success=="true") {
        this.Notification = {
          showSuccess    : 'YES',
          showError      : 'NO',
          title          : 'Success',
          content        : 'Reset link has been sent to your email account.',
          position       : ['top', 'right'],
          timeOut        : 5000,
          showProgressBar: true,
          pauseOnHover   : true,
          clickToClose   : true,
        };
      }
      if (confirmed.success=="false") {
        this.Notification = {
          showSuccess    : 'NO',
          showError      : 'YES',
          title          : 'Failed',
          content        : confirmed.message,
          position       : ['top', 'right'],
          timeOut        : 5000,
          showProgressBar: true,
          pauseOnHover   : true,
          clickToClose   : true,
        };
      }
    });
  }
  // countKeys( event) {
  //   console.log('event ',)
  //   if (event.key == 'e' || event.key == 'E' || event.key == '.' || event.key == '-' || event.key == '+') {
  //     event.preventDefault();
  //   }
  // }
  
}