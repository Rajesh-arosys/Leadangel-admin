import { DatePipe } from '@angular/common';
import { Component} from '@angular/core';
import { AadminDailogSevice } from 'src/app/common/admindailog/admindailog.service'
import { DataTableComponent } from 'src/app/common/data-table/table/data-table.module';
import { ProgressSpinnerComponent } from 'src/app/progress-spinner/progress-spinner.module';
import { LeadModel, leaduserDataPopup } from '../leadangeluserlist/leadangeluserlist.model';
import { ClientUserModel } from './clientuserlist.model';
import { ClientUserListService } from './clientuserlist.service';
import { NotifierService } from 'angular-notifier';
@Component({
  selector: 'app-clientuserlist',
  templateUrl: './clientuserlist.component.html',
  styleUrls: ['./clientuserlist.component.scss'],
  providers: [DataTableComponent,DatePipe,ProgressSpinnerComponent]
})
export class ClientuserlistComponent  {
  public ProgressSpinnermode = 'indeterminate';
  public displayProgressSpinner=true;
  public Notification={
    showSuccess    : 'NO',
    showError      : 'NO',
    title          : '',
    content        : '',
    position       : ['top', 'right'],
    timeOut        : 5000,
    showProgressBar: true,
    pauseOnHover   : true,
    clickToClose   : true,
  };
  columnHeader : any   = []
  dataForTable    : any   = []
  dataForFiter:any=[]
  isCompleted :boolean = false;
  dropdownOptions=[];
  cId:any={};

  constructor(public admindailgservice:AadminDailogSevice,
     public service:ClientUserListService,
     public notifier : NotifierService,) {
      }
      public leaddetails = new LeadModel();
      public clientdetail=new ClientUserModel();
      public noRecordsFound:boolean=false;

        selectionChanged(event){
          if(event!= undefined){
            this.getClientDetails({'clientidval':event['clientId']});
            this.cId={'clientidval':event['clientId']};
            this.displayProgressSpinner=true;
          }
        }

  ngOnInit() {
    this.getClient();
  }
  public async getClient(){
    this.service.clientList().subscribe((posRes)=>{
      this.clientdetail= posRes;
      this.dropdownOptions=this.clientdetail.data;
      if(this.clientdetail.success=="true"){
        this.displayProgressSpinner=false;
      }
    },(error)=>{console.log(error);});
  }
  public   async getClientDetails(client){
    this.leaddetails.data=[]
    this.isCompleted=false
    let tableColNamesFromAPI=[]
    let tableColNamesWithSpace={}
  


    this.leaddetails = await  this.service.getclientUserList(client).toPromise()
    console.log(this.leaddetails);
    if (this.leaddetails.success=="true") {
      if(this.leaddetails.data.length>0){
        let i=0
        let Actions=['Edit',"Reset",'Delete','Password Reset Link']
        let actionIcon=['edit',"refresh",'delete','link']
      // let iconColor=['successtext','successtext','successtext','successtext']
        this.leaddetails.data.forEach(element => {
          element.Actions=Actions
          element.PasswordLink=element.passwordResetLink
          element.ResetPasswordLinkData=""
          //element.iconColor=iconColor
          element.actionIcon=actionIcon
          element.popupFrom='ClientuserlistComponent'
          element.SNo=i+1
          i+=1

          element.firstName=element.firstName==null?'':element.firstName.charAt(0).toUpperCase()+ element.firstName.slice(1)
          element.lastName=element.lastName==null?'':element.lastName.charAt(0).toUpperCase()+ element.lastName.slice(1)
          element.emailAddress=element.emailAddress==null?'':element.emailAddress.toLowerCase()
          element.role=element.role==null?'':element.role.charAt(0).toUpperCase()+ element.role.slice(1)
          element.userstatus=element.userstatus==null?'':element.userstatus.charAt(0).toUpperCase()+ element.userstatus.slice(1)
        });
  
        tableColNamesFromAPI=Object.keys(this.leaddetails.data[0])
        for(let i=0;i<tableColNamesFromAPI.length;i++){
          tableColNamesWithSpace[tableColNamesFromAPI[i]] = this.insertSpaces(tableColNamesFromAPI[i])
        }
        this.columnHeader=tableColNamesWithSpace
        this.columnHeader.userstatus='Status'//changed from Ui need cahnge col name fron Db
        this.columnHeader.clientUserId='User Id'
        delete this.columnHeader.actionIcon
        delete this.columnHeader.popupFrom
        delete this.columnHeader.SNo
        delete this.columnHeader.iconColor
        delete this.columnHeader.IsDelete
        delete this.columnHeader.IsReset
        delete this.columnHeader.IsEdit
        delete this.columnHeader.ResetPasswordDate
        delete this.columnHeader.updatedOn
        delete this.columnHeader.updatedBy
        delete this.columnHeader.createdOn
        delete this.columnHeader.createdBy
        delete this.columnHeader.resetPasswordLinkStatus
        delete this.columnHeader.token
        delete this.columnHeader.passwordResetLink
        delete this.columnHeader.PasswordLink
        delete this.columnHeader.ResetPasswordLinkData
        delete this.columnHeader.password
        delete this.columnHeader.clientUserId
        delete this.columnHeader.rowNumber
        delete this.columnHeader.clientId
        delete this.columnHeader.clientPartnerID

        console.log(' this.dataForTable ', this.dataForTable)
        this.dataForFiter=this.leaddetails.data
        this.dataForTable= this.leaddetails.data
        this.isCompleted=true
        this.noRecordsFound=false
      }else{
        this.noRecordsFound=true
      }
       this.displayProgressSpinner=false;
    }
  }

  insertSpaces(string) {
    string = string.replace(/([a-z])([A-Z])/g, '$1 $2');
    string = string.replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
    return string;
  }
  dataTableRec(id){
      this.getClientDetails(id);
  }
  public  Opendailogbox(actionName:string,popupFrom) {
    actionName =   this.isArray(actionName)?actionName[0]: actionName;
      let options : leaduserDataPopup
      if (actionName == 'New') {
        options = {
          success:'',
          title:'New Client User',
          message: '',
          cancelText: 'Cancel',
          popupFrom:popupFrom,
          confirmText: 'Add',
          dialogtype: actionName,
          dropdownOptions:this.dropdownOptions,
          formdata:{ 
            userrole :'',
            firstname : '',
            lastname : '',
            useremailaddress:'',
            operationtype:'ADD',
            ssoEnabled:0,
            vyakaradminid:'',
            clientuserid: null,
            clientidval:null,
          }
        }
        }
      this.admindailgservice.open(options);
      this.admindailgservice.confirmed().subscribe(confirmed => {
        if (confirmed) {
          delete confirmed.clientuserid;
          delete confirmed.vyakaradminid;
          confirmed['clientidval']=confirmed.clientidval['clientId'];
            this.service.insertUpdtClientUser(confirmed).subscribe((posRes)=>{
              if(posRes['success']=="true"){
                if(posRes['data']==="User Already Exists"){
                  this.Notification={
                    showSuccess    : 'NO',
                    showError      : 'YES',
                    title          : 'Error',
                    content        : 'User Already Exists',
                    position       : ['top', 'right'],
                    timeOut        : 5000,
                    showProgressBar: true,
                    pauseOnHover   : true,
                    clickToClose   : true,
                  };
                  // this.notifier.notify('error', "User Already Exists"); 
                }
              else{
                this.Notification={
                  showSuccess    : 'YES',
                  showError      : 'NO',
                  title          : 'Success',
                  content        : 'New User registered.Please verify from mail',
                  position       : ['top', 'right'],
                  timeOut        : 5000,
                  showProgressBar: true,
                  pauseOnHover   : true,
                  clickToClose   : true,
                };
                this.getClientDetails(this.cId);
                // this.notifier.notify('success', "New User registered.Please verify from mail"); 
              }
            }
            },error => console.log(error));
        }
      });
  }
  isArray(obj : any ) {
    return Array.isArray(obj)
  } 

  tableFilterRec(filteredData){
    let i=0
    let Actions=['Edit',"Reset",'Delete','Password Reset Link']
    let actionIcon=['edit',"refresh",'delete','link']
   // let iconColor=['successtext','successtext','successtext','successtext']
    filteredData.forEach(element => {
      element.Actions=Actions
      element.PasswordLink=element.passwordResetLink
        element.ResetPasswordLinkData=""
      element.actionIcon=actionIcon
     // element.iconColor=iconColor
      element.popupFrom='ClientuserlistComponent'
      element.SNo=i+1
      i+=1

      const index = this.leaddetails.data.findIndex(item => item.emailAddress === element.emailAddress);
      element.clientUserId=this.leaddetails.data[index].clientUserId
      element.clientId=this.leaddetails.data[0].clientId
      element.vyakarAdminId=sessionStorage.getItem('vyakaradminid')
    });
    this.dataForTable=filteredData
    this.noRecordsFound=this.dataForTable.length==0?true:false
  } 

  clear(){
    this.dataForFiter=[]
    this.dataForTable= []
  }
}