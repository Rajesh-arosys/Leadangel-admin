import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AdminLogin, AdminLoginSuccessModel } from './admin-login.model'
import { AdminLoginService } from './admin-login.service';
import { SharedService } from '../common/shared.service';
import { Idle, DEFAULT_INTERRUPTSOURCES} from '@ng-idle/core';
import { Keepalive} from '@ng-idle/keepalive';
import { ForgotpassService } from '../common/forgotpass/forgotpass.service';


@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.scss']
})
export class AdminloginComponent implements OnInit {
  public adminloginForm: FormGroup
  public AdminLoginSuccessModel = new AdminLoginSuccessModel()

  //auto logout
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;
  showTimeoutMsg: boolean;
  timedOutMsg: string;

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

  constructor(private fb: FormBuilder,
    private cookieService: CookieService, 
    private router: Router,
    private adminLoginService: AdminLoginService,
    private sharedService: SharedService,
    private idle: Idle,
    public forgotdialog: ForgotpassService,
    private keepalive: Keepalive) 
    { 
      // sets an idle timeout of 5 seconds, for testing purposes.
      idle.setIdle(3590);
      // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
      idle.setTimeout(10); 
      // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
      idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

      idle.onIdleEnd.subscribe(() => this.idleState = 'No longer idle.');
      idle.onTimeout.subscribe(() => {
        this.idleState = 'Timed out!';
        this.timedOut = true;
        // console.log("timedOut")
        sessionStorage.removeItem('firstname');
        sessionStorage.removeItem('lastname');
        sessionStorage.removeItem('clientid');
        sessionStorage.removeItem('role');
        sessionStorage.removeItem('emailaddress');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('LoginType');
        sessionStorage.removeItem('vyakaradminid');
        this.router.navigate(['/leadangel-login'])
        sessionStorage.clear();
      });
      idle.onIdleStart.subscribe(() => this.idleState = 'You\'ve gone idle!');
      idle.onTimeoutWarning.subscribe((countdown) => this.idleState = 'You will time out in ' + countdown + ' seconds!');

      // sets the ping interval to 15 seconds
      keepalive.interval(15);

      keepalive.onPing.subscribe(() => this.lastPing = new Date());

      this.reset();
   }
  ngOnInit() {

    this.adminloginForm = this.fb.group({
      email   : ['',Validators.required],
      pwd  : ['',Validators.required],
      remember: [false],
    });
    

     // if(localStorage.getItem('token') !== null){
    //   this.router.navigate(['/leadangeladmin']) 
    // }
    // console.log(this.cookieService.get('email'));
    // console.log(this.cookieService.get('pwd'));
    // console.log(this.cookieService.get('remember'));
    
    this.cookieService.get('email')
    this.cookieService.get('pwd')
    this.cookieService.get('remember')
 ;

    if(this.cookieService.get('remember')=='YES'){
      this.adminloginForm = this.fb.group({
        email   : [this.cookieService.get('email')],
        pwd     : [this.adminLoginService.get('123456$#@$^@1ERF', this.cookieService.get("pwd"))],
        remember: [true],
      });
    }

  }
  // auto logout
  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut  = false;
  }
  onAdminLogin(){
    this.sharedService.clientId=0
    this.sharedService.emailAddress=this.adminloginForm.value.email

    let loginApiCallBody = {
      "clientid"    : 0,
      "emailaddress": this.adminloginForm.value.email,
      "password"    : this.adminloginForm.value.pwd
    }
    // console.log('form value ',this.adminloginForm.value)
    this.adminLoginService.loginCheck(loginApiCallBody).subscribe(res=>{
      this.AdminLoginSuccessModel = res
      // console.log('this.AdminLoginSuccessModel',this.AdminLoginSuccessModel)
      if(this.AdminLoginSuccessModel.status === "true"){

        if(this.adminloginForm.value.remember){

          let expiredDate = new Date();
          expiredDate.setDate( expiredDate.getDate() + 365)

          this.cookieService.set( 'email', this.adminloginForm.value.email,expiredDate );
          this.cookieService.set( 'pwd',   this.adminLoginService.set('123456$#@$^@1ERF',  this.adminloginForm.value.pwd),expiredDate );
          this.cookieService.set( 'remember', 'YES',expiredDate );

        }else{
          this.cookieService.delete("email");
          this.cookieService.delete("pwd");
          this.cookieService.delete("remember");
        }

          // console.log(this.cookieService.get('email'));
          // console.log(this.cookieService.get('pwd'));
          // console.log(this.cookieService.get('remember'));

          this.cookieService.get('email')
          this.cookieService.get('pwd')
          this.cookieService.get('remember')

          sessionStorage.setItem('firstname', this.AdminLoginSuccessModel.data.firstname);
          sessionStorage.setItem('lastname', this.AdminLoginSuccessModel.data.lastname);
          sessionStorage.setItem('clientid', '0');
          sessionStorage.setItem('role', this.AdminLoginSuccessModel.data.role);
          sessionStorage.setItem('emailaddress', this.AdminLoginSuccessModel.data.EmailAddress);
          sessionStorage.setItem('token', this.AdminLoginSuccessModel.data.UserToken);
          sessionStorage.setItem('LoginType','adminlogin');
          
          sessionStorage.setItem('vyakaradminid', this.AdminLoginSuccessModel.data.vyakaradminid);
          this.router.navigate(['leadangeladmin/leadangeluserlist'])
        this.reset();
       
      }else {
        this.Notification = {
          showSuccess: 'NO',
          showError: 'YES',
          title: 'Login Failed',
          content: 'Please Enter Correct Credential',
          position: ['top', 'right'],
          timeOut: 5000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: true,
        };
      }
    })

  }
  forgotpass(action: string) {
    let options: any
    if (action == 'forgetPassAdmin') {
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
    });
  }

}
