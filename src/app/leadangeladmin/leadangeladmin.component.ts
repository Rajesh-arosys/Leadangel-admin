import { Component, OnInit } from '@angular/core';
import { SharedService } from '../common/shared.service';
import { Router } from '@angular/router';
import { ForgotpassService } from '../common/forgotpass/forgotpass.service';


export class menulist{
  menuname:string;
  icon:string;
  link:string
};
@Component({
  selector: 'app-leadangeladmin',
  templateUrl: './leadangeladmin.component.html',
  styleUrls: ['./leadangeladmin.component.scss']
})
export class LeadangeladminComponent implements OnInit {
  public userName:string
  public vyakaradminid
  
   // notification 
   public Notification = {
    showSuccess: 'NO',
    showError: 'NO',
    title: '',
    content: '',
    position: ['top', 'right'],
    timeOut: 5000,
    showProgressBar: true,
    pauseOnHover: true,
    clickToClose: true,
  };

 
  constructor(private router: Router,public forgotdialog: ForgotpassService) {

   }

  ngOnInit() {
    this.userName=sessionStorage.getItem('firstname')+' '+sessionStorage.getItem('lastname')
    this.vyakaradminid=sessionStorage.getItem('vyakaradminid')

  }
  onAdminLogout(){
    sessionStorage.removeItem('firstname');
    sessionStorage.removeItem('lastname');
    sessionStorage.removeItem('clientid');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('emailaddress');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('LoginType');
    sessionStorage.removeItem('vyakaradminid');

    this.router.navigate(['/leadangel-login']);
  }

  forgotpass(action: string) {
    let options: any
    if (action == 'changePassClient') {
      options = {
        title      : 'Change Password',
        message    : '',
        cancelText : 'Cancel',
        confirmText: 'Change Password',
        dialogtype : action
      };
    }else if(action == 'changePassAdmin'){
      options = {
        title      : 'Change Password',
        message    : '',
        cancelText : 'Cancel',
        confirmText: 'Change Password',
        dialogtype : action
      };
    }
    this.forgotdialog.open(options)
    this.forgotdialog.confirmed().subscribe(confirmed => {
      console.log(confirmed)
      if(confirmed.success=="true") {
        this.Notification = {
          showSuccess    : 'YES',
          showError      : 'NO',
          title          : 'Success',
          content        : confirmed.message,
          position       : ["top", "left"],
          timeOut        : 5000,
          showProgressBar: true,
          pauseOnHover   : true,
          clickToClose   : true,
        };
      }
    });
  }

}
