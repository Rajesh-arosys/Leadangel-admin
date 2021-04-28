import { Component, OnInit } from '@angular/core';
import {ImpersonateService  } from './impersonate.service';
import { clientModel, impersonateLoginDeatilModel, clientUserModel } from './impersonate.model';
import { NotifierService } from 'angular-notifier';
@Component({
  selector: 'app-impersonatelogin',
  templateUrl: './impersonatelogin.component.html',
  styleUrls: ['./impersonatelogin.component.scss'],
})
export class ImpersonateloginComponent implements OnInit {

  public clientModel = new clientModel();  //model
  public clientUserModel = new clientUserModel();  //model
  public impersonateLoginDeatilModel = new impersonateLoginDeatilModel();  //model


  selectedProject = '';

  // public clientModel:clientModel
  // public clientUserModel:clientUserModel
  public ArrayLength:any
  public clientIDVal:any

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

  constructor(private ImpersonateService:ImpersonateService, public notifier:NotifierService) {
      this.impersonateLoginDeatilModel.clientId=""
      // this.clientModel=new clientModel()
      // this.clientUserModel=new clientUserModel()
      this.ArrayLength=true
     }

  ngOnInit() {
    this.impersonateLoginDeatilModel.clientUserId=null
    let clientUserDetail = {
      "emailaddress"  : localStorage.getItem('emailaddress'),
      "x-access-token": localStorage.getItem('token'),
      "clientid"      : 0
    }
    this.ImpersonateService.getClientDeatil(clientUserDetail).subscribe(res => {
      if (res.success = "true") { 
        this.clientModel.ClientDeatil = res.data
      }
    })
  }

  getUserDeatil = () =>{
    this.impersonateLoginDeatilModel.clientUserId=null
    this.impersonateLoginDeatilModel.clientId=this.clientIDVal
    //this.impersonateLoginDeatilModel.clientUserId=undefined
    this.ArrayLength=true
    if(this.impersonateLoginDeatilModel.clientId!=null){
      // console.log('this.impersonateLoginDeatilModel.clientId',this.impersonateLoginDeatilModel.clientId)
      // console.log('this.impersonateLoginDeatilModel.clientUserId',this.impersonateLoginDeatilModel.clientUserId)
      // this.ArrayLength=true
      let getClientUserApiData = {
        "emailaddress"  : localStorage.getItem('emailaddress'),
        "x-access-token": localStorage.getItem('token'),
        "clientid"      : 0,
        "clientidval"   : this.impersonateLoginDeatilModel.clientId,
      }
    
       console.log('getClientUserApiData',getClientUserApiData)
      this.ImpersonateService.getClientAdminDeatil(getClientUserApiData).subscribe(res=>{
  
        
        if (res.success=="true") {
            this.clientUserModel.ClientUserDeatil=res.data
            // console.log('ClientUserDeatil',this.clientUserModel.ClientUserDeatil)
            // console.log('ClientUserDeatil length',this.clientUserModel.ClientUserDeatil.length)
            if(this.clientUserModel.ClientUserDeatil.length==0){
              // this.ArrayLength=false
            }
        }
  
      })
    }
    else{
      this.clientUserModel.ClientUserDeatil=[]
    }
 
  }
  selectName(){
    console.log('arraylength')
    this.ArrayLength=false
  }

  onImpersonateLogin(){
    //console.log(this.impersonateLoginDeatilModel.clientId,this.impersonateLoginDeatilModel.emailAddress)
    //window.open("index.html#/report-copy/ro-voucher-detail-report?requestID=" + requestID + "&voucherID=" + voucherID);
    // window.open("/client-dashboard");
    let ImpersonateLoginAPIdata = {
      "emailaddress" : localStorage.getItem('emailaddress'),
      "x-access-token" :localStorage.getItem('token'),
      "clientid":0,
      "clientuserid":this.impersonateLoginDeatilModel.clientUserId,
      "selectedclientid":this.impersonateLoginDeatilModel.clientId
    }
    console.log('ImpersonateLoginAPIdata',ImpersonateLoginAPIdata)
    this.ImpersonateService.ImpersonateLogin(ImpersonateLoginAPIdata).subscribe(res=>{
      console.log('res',res)
      if(res.data.userstatus=="Inactive"){
        this.Notification = {
          showSuccess    : 'NO',
          showError      : 'YES',
          title          : 'Error',
          content        : "User is not Active",
          position       : ['top', 'right'],
          timeOut        : 3000,
          showProgressBar: true,
          pauseOnHover   : true,
          clickToClose   : true,
        };
        // this.notifier.notify("error", "User is not Active");
      }
      else if(res.data.token!=null){
        if(res.success=="true" && res.data.userstatus=="active" ){

          localStorage.setItem('ClientfirstName', res.data.firstName);
          localStorage.setItem('ClientlastName', res.data.lastName);
          localStorage.setItem('clientid', this.impersonateLoginDeatilModel.clientId);
          localStorage.setItem('role', res.data.role);
          localStorage.setItem('emailaddress', res.data.emailAddress);
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('LoginType','impersonatelogin');
          
          localStorage.setItem('clientUserId', res.data.clientUserId);
          localStorage.setItem("clientPartnerId", res.data.clientPartnerID)

       
            if(res.data.role == "PartnerAdmin"){
              window.open("/index.html#/partneradmin");
            }
            else{
              window.open("/index.html#/dashboard");
            }
        
  
        }
        else if(res.success=="true" && res.data.userstatus=="Inactive"){
        }
      }else{
        window.open("/index.html#/");
      }

    })
  }

  
}
   