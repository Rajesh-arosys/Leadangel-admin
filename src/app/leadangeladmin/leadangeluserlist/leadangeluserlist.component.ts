import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AadminDailogSevice } from 'src/app/common/admindailog/admindailog.service';
import { LeadangeluserlistService } from './leadangeluserlist.service';

import { DatePipe } from '@angular/common';
import { DataTableComponent } from 'src/app/common/data-table/table/data-table.module';
import { LeadModel, leaduserDataPopup } from './leadangeluserlist.model';
import { ProgressSpinnerComponent } from 'src/app/progress-spinner/progress-spinner.module';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-leadangeluserlist',
  templateUrl: './leadangeluserlist.component.html',
  styleUrls: ['./leadangeluserlist.component.scss'],
  providers: [DataTableComponent,DatePipe,ProgressSpinnerComponent]
})
export class LeadangeluserlistComponent {
  public ProgressSpinnermode = 'indeterminate';
  public displayProgressSpinner=true
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

  // common Data table header and data
  columnHeader : any   = []
  dataForTable    : any   = []
  dataForFiter:any=[]
  isCompleted :boolean = false;

  constructor(public dialog:MatDialog, 
    public admindailgservice:AadminDailogSevice,
     public service:LeadangeluserlistService,
     private router: Router,
     public notifier:NotifierService,) {
      }
      public leaddetails = new LeadModel();
      public noRecordsFound:boolean=false;

  ngOnInit() {
    this.getClientDetails();
  }
  public   async getClientDetails(){
    this.leaddetails.data=[]
    this.isCompleted=false
    let tableColNamesFromAPI=[]
    let tableColNamesWithSpace={}

    this.leaddetails = await  this.service.getVyakarClient().toPromise()
    // console.log(' this.leaddetails ', this.leaddetails)
   
    if(this.leaddetails.success=="true") {
      if(this.leaddetails.data.length>0){
        let i=0
        let Actions=['Edit',"Reset",'Delete']
        let actionIcon=['edit',"refresh",'delete']
       // let iconColor=['successtext','successtext','successtext']
        this.leaddetails.data.forEach(element => {
          element.Actions=Actions
          element.actionIcon=actionIcon
        //  element.iconColor=iconColor
          element.popupFrom='LeadangeluserlistComponent'
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
        this.columnHeader.userstatus='Status'
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
        delete this.columnHeader.password
        delete this.columnHeader.rowNumber


       
        this.dataForFiter=this.leaddetails.data
        this.dataForTable= this.leaddetails.data
        this.isCompleted=true
        this.noRecordsFound=false
        
      }else{
        this.noRecordsFound=true
      }
      this.displayProgressSpinner=false;
    }
    else{
      // this.sideNavService.adminTokenStatus(this.leaddetails.tokenstatus)
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
    
  }

  insertSpaces(string) {
    string = string.replace(/([a-z])([A-Z])/g, '$1 $2');
    string = string.replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
    return string;
  }
  dataTableRec(isUpdated){
    if(isUpdated){
      this.getClientDetails()
    }
  }
  public  Opendailogbox(actionName:string,popupFrom) {
    actionName =   this.isArray(actionName)?actionName[0]: actionName;
      let options : leaduserDataPopup
      if (actionName == 'New') {
        options = {
          success:'',
          title:'Add LeadAngel User',
          message: '',
          cancelText: 'Cancel',
          confirmText: 'Add',
          dialogtype: actionName,
          dropdownOptions :'',
          popupFrom:popupFrom,
          formdata:{ 
            userrole :'',
            firstname : '',
            lastname : '',
            useremailaddress:'',
            ssoEnabled:0,
            operationtype:'ADD',
            vyakaradminid:'',
            clientuserid: null,
            clientidval:null
          }
        }
        }
      this.admindailgservice.open(options);
      this.admindailgservice.confirmed().subscribe(confirmed => {
        if (confirmed) {
          delete confirmed.clientuserid;
          delete confirmed.vyakaradminid;
            this.service.insupdateDelClient(confirmed).subscribe((posRes:any)=>{
              this.getClientDetails();
              if(posRes.success=="true"){  
                if(posRes.data==="User Already Exists"){
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
                  // this.notifier.notify('error', "User Already Exists'");     
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
    let Actions=['Edit',"Reset",'Delete']
    let actionIcon=['edit',"refresh",'delete']
   // let iconColor=['successtext','successtext','successtext']
    filteredData.forEach(element => {
      element.Actions=Actions
      element.actionIcon=actionIcon
    //  element.iconColor=iconColor
      element.popupFrom='LeadangeluserlistComponent'
      element.SNo=i+1
      i+=1
    });
    this.dataForTable=filteredData
    this.noRecordsFound=this.dataForTable.length==0?true:false
  }
} 