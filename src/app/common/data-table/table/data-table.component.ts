import { DatePipe } from '@angular/common';
import {Component, OnInit, ViewChild, Input, SimpleChanges,EventEmitter,Output} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MatSort, MatTableDataSource,MatPaginator, Sort,PageEvent } from '@angular/material';
import { MatDialog } from '@angular/material';
import { ClientUserListService } from 'src/app/leadangeladmin/clientuserlist/clientuserlist.service';
import { leaduserDataPopup, LeadModel } from 'src/app/leadangeladmin/leadangeluserlist/leadangeluserlist.model';
import { LeadangeluserlistService } from 'src/app/leadangeladmin/leadangeluserlist/leadangeluserlist.service';
import { ClientDataPopupModel } from 'src/app/leadangeladmin/manageclientsettings/manage-client-model';
import { ManageClientService } from 'src/app/leadangeladmin/manageclientsettings/manage-client.service';
import { AadminDailogSevice } from '../../admindailog/admindailog.service';
import { DataTableFilterComponent } from '../filter/data-table-filter.module';
import { CustomNotificationComponent } from '../../custom-notification/custom-notification.component';
import { CrmdatarefreshService } from 'src/app/leadangeladmin/crmdatarefresh/crmdatarefresh.service';
import { NotifierService } from 'angular-notifier';
import { merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';


@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  providers:[DataTableFilterComponent,CustomNotificationComponent]
})
export class DataTableComponent implements OnInit {

  @Input() pageLength;
  @Input() tableData;
  @Input() columnHeader;
  @Input() showFandLBtn = true
  @Output() isUpdated:EventEmitter<any>= new EventEmitter()//sends update status 'isMngClSettUpdated' to manageclientsettings component 
  isMngClSettUpdated=false
  isUserandAccessUpdated = false;
  isLeadUserUpdated = false;
  isSrAccountMappUpdated=false
  runLimit = 100
  
  pageSize = 10

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

  objectKeys = Object.keys;
  dataSource;
  // public formData:FormData;
  public mngclientDataPopup    = new ClientDataPopupModel();   //model
  public leadDataPopup = new leaduserDataPopup();  //model
  public leadDetail = new LeadModel();  //model
  public Clientrole; //for user role
  public loggedInAdnimEmail=''
  public loggedInClientEmail=''
  public loginTypeCl=''
  public loginTypeAdm=''
  utcConvertColumns = ['CreatedDate','RoutedTimestamp','Createdts','Modifiedts','UploadDate','ModifiedDate']





  @ViewChild(MatSort,{static: true}) sort: MatSort;
  @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;

  constructor(
    public  dialog                 : MatDialog,
    public  admindailgservice      : AadminDailogSevice,
    private manageClientService    : ManageClientService,
    private leadservice            : LeadangeluserlistService,
    public  datepipe               : DatePipe,
    public  clientUserService      : ClientUserListService,
    public  crmdataservice         : CrmdatarefreshService,
    public  notifier                 : NotifierService,
  ) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;

   
    
    this.pageLength
    this.Clientrole          = localStorage.getItem('role')
    
    this.loggedInClientEmail = localStorage.getItem('emailaddress')
    this.loginTypeCl           = localStorage.getItem('LoginType')

    this.loggedInAdnimEmail  = sessionStorage.getItem('emailaddress')
    this.loginTypeAdm        = sessionStorage.getItem('LoginType')

    
    console.log('loggedInAdnimEmail ',this.loggedInAdnimEmail)
    console.log('loggedInClientEmail ',this.loggedInClientEmail)

    if(this.loggedInAdnimEmail!=''){
      this.loggedInAdnimEmail=this.loggedInAdnimEmail==null?'':this.loggedInAdnimEmail.toLowerCase()
    }
    if(this.loggedInClientEmail!=''){
      this.loggedInClientEmail=this.loggedInClientEmail==null?'':this.loggedInClientEmail.toLowerCase()
    }
    
  }


  ngOnChanges(changes: SimpleChanges) {
    // only run when property "tableData" changed
    if (changes['tableData']) {
      this.dataSource = new MatTableDataSource(this.tableData);
      this.dataSource.sort = this.sort;
      if(this.pageLength){setTimeout(() => { this.paginator.length = this.pageLength; })}
      this.dataSource.paginator = this.paginator;
      // console.log('tableData ',this.tableData )
      // console.log(this.dataSource.filteredData.length);
      this.dataSource.sortingDataAccessor = (item, property) => {
        if(this.utcConvertColumns.includes(property)){
          return new Date(item[property]);
        }else{
          // if (typeof item[property] === 'string') {
          //   return item[property].toLocaleLowerCase();
          // }
          return item[property]
        }
      };

    }
  }

  // ngAfterViewInit() {
  //   this.paginator.firstPage = () => {
  //     this.runLimit = 100
  //     this.paginator.pageIndex = 0
  //     this.paginator.page.next({      
  //       pageIndex: 0,
  //       pageSize: this.paginator.pageSize,
  //       length: this.paginator.length
  //      });
  //      if(this.pageLength >= 1000){
  //        this.isUpdated.emit({pageIndex : 0, pageSize : 10, firstPage : true})
  //      }
  //   }
  //   this.paginator.lastPage = () => {
  //     if(this.pageLength >= 1000){
  //       this.lastPageFunction()
  //     }else{
  //       this.paginator.pageIndex = Math.floor(this.tableData.length%10 == 0 ? (this.tableData.length/10)-1 : this.tableData.length/10);
  //       this.paginator.page.next({      
  //         pageIndex: Math.floor(this.tableData.length/10),
  //         pageSize: this.paginator.pageSize,
  //         length: this.paginator.length
  //        });
  //     }
  //   }
  //  }

   moveToFirstPage(){
     this.paginator.pageIndex = 0
   }

  UTCDate(str){
    // let date=new Date(str).getTime();
    // let datee =this.datepipe.transform(date, 'MMM dd, yyyy h:mm:ss a')+' UTC';
    // return datee
    let date
    if(str== null){
      date = ''
    }else{
     date = new Date(str).toUTCString();
      date = date.replace('GMT','UTC')
    }
    return date
  }
  
   lastPageFunction(){
    this.isUpdated.emit({pageIndex : this.runLimit , pageSize:10})
    this.paginator.pageIndex =  this.pageLength > (this.runLimit*10 + 1000) ?  this.runLimit : Math.floor(this.pageLength/10);
    this.paginator.page.next({      
     pageIndex: this.pageLength > (this.runLimit*10 + 1000) ?  this.runLimit : Math.floor(this.pageLength/10),
     pageSize: this.paginator.pageSize,
     length: this.paginator.length
    });
    this.runLimit = this.pageLength > (this.runLimit*10 + 1000) ? this.runLimit + 100 : this.runLimit     
  }

  

  
 
  // manage client setting
  public   async Opendailogbox(rowData:any,actionName:string) {
    console.log(rowData);

    actionName =   this.isArray(actionName)?actionName[0]: actionName
    let apiCallbody={
      "c_clientId":rowData.clientId
    }
     // 1
     if(actionName == 'Setting'){
      this.mngclientDataPopup = await  this.manageClientService.manageClientPopUpDetail(apiCallbody).toPromise();
      if (this.mngclientDataPopup.success=="true") {
        let options : ClientDataPopupModel
        if (actionName == 'Setting') {
          options = {
            success:'',
            title:'Manage Client Settings',
            message: '',
            cancelText: 'Cancel',
            confirmText: 'Save',
            dialogtype: actionName,
            data:{ 
              AccountIndex_1            : this.mngclientDataPopup.data.AccountIndex_1==null?'':this.mngclientDataPopup.data.AccountIndex_1,
              AppVersion                : this.mngclientDataPopup.data.AppVersion==1?'Y':'N',
              AssignmentBlockLimit      : this.mngclientDataPopup.data.AssignmentBlockLimit==null?'':this.mngclientDataPopup.data.AssignmentBlockLimit,
              CRMIsValid                : this.mngclientDataPopup.data.CRMIsValid==null?'':this.mngclientDataPopup.data.CRMIsValid,
              ClientID                  : this.mngclientDataPopup.data.ClientID==null?'':this.mngclientDataPopup.data.ClientID,
              ClientType                : this.mngclientDataPopup.data.ClientType==null?'':this.mngclientDataPopup.data.ClientType,
              ContractExpirationDate    : this.mngclientDataPopup.data.ContractExpirationDate==null?'':this.mngclientDataPopup.data.ContractExpirationDate,
              DataAppend                : this.mngclientDataPopup.data.DataAppend==null?'':this.mngclientDataPopup.data.DataAppend,
              ExternalCRMSystem         : this.mngclientDataPopup.data.ExternalCRMSystem==null?'':this.mngclientDataPopup.data.ExternalCRMSystem,
              ExternalMASystem          : this.mngclientDataPopup.data.ExternalMASystem==null?'':this.mngclientDataPopup.data.ExternalMASystem,
              FreeRoutingLimit          : this.mngclientDataPopup.data.FreeRoutingLimit==null?'':this.mngclientDataPopup.data.FreeRoutingLimit,
              FreeUserRun               : this.mngclientDataPopup.data.FreeUserRun==null?'':this.mngclientDataPopup.data.FreeUserRun,
              IsMALeadConfigure         : this.mngclientDataPopup.data.IsMALeadConfigure==1?'1':'0',
              IsPartnerConfigure        : this.mngclientDataPopup.data.IsPartnerConfigure==1?'1':'0',
              LeadIndex_1               : this.mngclientDataPopup.data.LeadIndex_1==null?'':this.mngclientDataPopup.data.LeadIndex_1,
              MAIsValid                 : this.mngclientDataPopup.data.MAIsValid==null?'':this.mngclientDataPopup.data.MAIsValid,
              MatchLevel                : this.mngclientDataPopup.data.MatchLevel==null?'':this.mngclientDataPopup.data.MatchLevel,
              NamespacePrefix           : this.mngclientDataPopup.data.NamespacePrefix==null?'':this.mngclientDataPopup.data.NamespacePrefix,
              NextPartnerRouterRunTs    : this.mngclientDataPopup.data.NextPartnerRouterRunTs==null?'':this.mngclientDataPopup.data.NextPartnerRouterRunTs,
              NextQuickRouterRunTs      : this.mngclientDataPopup.data.NextQuickRouterRunTs==null?'':this.mngclientDataPopup.data.NextQuickRouterRunTs,
              NextRouterRunTs           : this.mngclientDataPopup.data.NextRouterRunTs==null?'':this.mngclientDataPopup.data.NextRouterRunTs,
              NextSegmentationRunTs     : this.mngclientDataPopup.data.NextSegmentationRunTs==null?'':this.mngclientDataPopup.data.NextSegmentationRunTs,
              OrgId                     : this.mngclientDataPopup.data.OrgId==null?'':this.mngclientDataPopup.data.OrgId,
              ParterRouterTimeInterval  : this.mngclientDataPopup.data.ParterRouterTimeInterval==null?'':this.mngclientDataPopup.data.ParterRouterTimeInterval,
              PartnerRouter             : this.mngclientDataPopup.data.PartnerRouter==null?'':this.mngclientDataPopup.data.PartnerRouter,
              QuickRouterRunTimeInterval: this.mngclientDataPopup.data.QuickRouterRunTimeInterval==null?'':this.mngclientDataPopup.data.QuickRouterRunTimeInterval,
              Router                    : this.mngclientDataPopup.data.Router==null?'':this.mngclientDataPopup.data.Router,
              RouterTimeInterval        : this.mngclientDataPopup.data.RouterTimeInterval==null?'':this.mngclientDataPopup.data.RouterTimeInterval,
              SFDCIntegration           : this.mngclientDataPopup.data.SFDCIntegration==null?'':this.mngclientDataPopup.data.SFDCIntegration,
              Segmentation              : this.mngclientDataPopup.data.Segmentation==null?'':this.mngclientDataPopup.data.Segmentation,
              SegmentationTimeInterval  : this.mngclientDataPopup.data.SegmentationTimeInterval==null?'':this.mngclientDataPopup.data.SegmentationTimeInterval,
              SendAlertMail             : this.mngclientDataPopup.data.SendAlertMail==null?'':this.mngclientDataPopup.data.SendAlertMail,
              UseCustomRule             : this.mngclientDataPopup.data.UseCustomRule==null?'':this.mngclientDataPopup.data.UseCustomRule,
              c_clientId                : this.mngclientDataPopup.data.ClientID==null?'':this.mngclientDataPopup.data.ClientID,
            }
          };
        }
        this.admindailgservice.open(options);
        this.admindailgservice.confirmed().subscribe(confirmed => {
          console.log('confirmed ', confirmed)
          if (confirmed.data=='update') {
          }
        });
      }
    }
    // 3
    else  if(rowData.popupFrom == "LeadangeluserlistComponent"){
      console.log('3')

      this.leadDataPopup=rowData;
      let options : leaduserDataPopup;
      if (actionName == 'Edit') {
        options = {
          success:'',
          title:'Edit LeadAngel  User',
          message: '',
          cancelText: 'Cancel',
          confirmText: 'Update',
          dropdownOptions : '',
          popupFrom:rowData.popupFrom,
          dialogtype: actionName,
          formdata:{ 
          firstname:this.leadDataPopup['firstName'],
          lastname:this.leadDataPopup['lastName'],
          useremailaddress:this.leadDataPopup['emailAddress'],
          userrole:this.leadDataPopup['role'],
          ssoEnabled:this.leadDataPopup['ssoEnabled'],
          operationtype:'Edit',
          vyakaradminid:this.leadDataPopup['vyakarAdminId'],
          clientuserid:this.leadDataPopup['clientUserId'],
          clientidval:this.leadDataPopup['clientId']
          }
        }
      }
        else  if (actionName == 'Delete') {
          options = {
            success:'',
            title:this.leadDataPopup['emailAddress'],
            message: 'Are you sure, you want to delete user',
            cancelText: 'Cancel',
            confirmText: 'Delete',
            dropdownOptions : '',
            popupFrom:rowData.popupFrom,
            dialogtype: actionName,
            formdata:{ 
            firstname:this.leadDataPopup['firstName'],
            lastname:this.leadDataPopup['lastName'],
            useremailaddress:this.leadDataPopup['emailAddress'],
            userrole:this.leadDataPopup['role'],
            ssoEnabled:this.leadDataPopup['ssoEnabled'],
            operationtype:'DELETE',
            vyakaradminid:this.leadDataPopup['vyakarAdminId'],
            clientuserid:this.leadDataPopup['clientUserId'],
            clientidval:this.leadDataPopup['clientId']
            }
          };
        }else  if (actionName == 'Reset') {
          options = {
            success:'',
            title:this.leadDataPopup['emailAddress'],
            message: 'Send Reset password link to ',
            cancelText: 'Cancel',
            confirmText: 'Send Link',
            dropdownOptions:'',
            dialogtype: actionName,
            popupFrom:rowData.popupFrom,
            formdata:{ 
              firstname:this.leadDataPopup['firstName'],
              lastname:this.leadDataPopup['lastName'],
              useremailaddress:this.leadDataPopup['emailAddress'],
              userrole:this.leadDataPopup['role'],
              ssoEnabled:this.leadDataPopup['ssoEnabled'],
              operationtype:'RESET',
              vyakaradminid:this.leadDataPopup['vyakarAdminId'],
              clientuserid:this.leadDataPopup['clientUserId'],
              clientidval:this.leadDataPopup['clientId']
            }
          };
        }
        this.admindailgservice.open(options);
        this.admindailgservice.confirmed().subscribe(confirmed => {
          if (confirmed) {
            if(confirmed.operationtype == "RESET"){
            // console.log(rowData)
              let resetPasswordBody = {
                
                "emailaddress":rowData.emailAddress,
                "clientid" : 0  
              }
              console.log('resetPasswordBody',resetPasswordBody)
              this.leadservice.ForgotPasswordVyakarAdmin(resetPasswordBody).subscribe(res=>{
              //  console.log("ressssss");
                if (res.success=="true") {
                  this.Notification={
                    showSuccess    : 'YES',
                    showError      : 'NO',
                    title          : 'Success',
                    content        : 'Reset password link has been sent successfully',
                    position       : ['top','left'],
                    timeOut        : 5000,
                    showProgressBar: true,
                    pauseOnHover   : true,  
                    clickToClose   : true,
                  };
                  // this.notifier.notify('success', "Reset password link has been sent successfully"); 
                }
              },(error)=>console.log(error))
          }
            else{
            this.leadDataPopup.formdata=confirmed;
            this.leadUserUpdate(this.leadDataPopup.formdata);}
        }
      });
    }
    // 4
    else if(rowData.popupFrom == "CrmdatarefreshComponent"){
     console.log(rowData);
      let options;
      if (actionName == 'Edit') {
        options = {
          title      : 'Edit CRM Data Refresh Details',
          message    : '',
          cancelText : 'Cancel',
          confirmText: 'UPDATE',
          clientid   : rowData.clientId,
          popupFrom  : rowData.popupFrom,
          dialogtype : actionName,
          formdata   : { 
            c_clientid        : rowData.ClientId,
            externalsystemtype: rowData.ExternalSystemType,
            action            : rowData.Action=="Rematch"?"1": "2",
            filtercondition   : rowData.FilterCondition,
            operationtype     : 'UPDATE',
            maintenanceid     : rowData.MaintenanceId
          }
        };
       
      }
  
      if (actionName == 'Execute') {
        options = {
          message: 'Are you Sure, You want to Execute ?',
          cancelText: 'No',
          confirmText: 'Yes',
          dialogtype: actionName,
          clientid:rowData.ClientId,
          popupFrom:rowData.popupFrom,
          formdata:{ 
            c_clientid :rowData.ClientId,
            externalsystemtype : '',
            action : '',
            filtercondition:'',
            operationtype:'EXECUTE',
            maintenanceid:rowData.MaintenanceId}
        };
       
      }
  
      if (actionName == 'Delete') {
        options = {
          message: 'Are you Sure, You want to Delete ?',
          cancelText: 'No',
          confirmText: 'Yes',
          dialogtype: actionName,
          clientid:rowData.ClientId,
          popupFrom:rowData.popupFrom,
          formdata:{ 
            c_clientid :rowData.ClientId,
            externalsystemtype : '',
            action : '',
            filtercondition:'',
            operationtype:'DELETE',
            maintenanceid:rowData.MaintenanceId}
        };
       
      }
      this.admindailgservice.open(options);

    this.admindailgservice.confirmed().subscribe(confirmed => {
      //console.log("confirmed",confirmed);
      if (confirmed) {       
      if(confirmed.action=="3"){
        confirmed['rematch']='1';
        confirmed['reupload']='1'}
        else {if(confirmed.action=="1"){
          confirmed['rematch']='1';
          confirmed['reupload']='0';
        }
        else{
          confirmed['rematch']='0';
          confirmed['reupload']='1';
        }}
      this.CrmDataRefresh(confirmed);
    }
  });
    }
    // 5
    else  if(rowData.popupFrom == "ClientuserlistComponent"){
      console.log('ClientuserlistComponent ', rowData)
      this.leadDataPopup=rowData;
      let options : leaduserDataPopup;
      if (actionName == 'Edit') {
        options = {
          success:'',
          title:'Edit User',
          message: '',
          cancelText: 'Cancel',
          confirmText: 'Update',
          dropdownOptions :rowData.dropdownOptions,
          popupFrom:rowData.popupFrom,
          dialogtype: actionName,
          formdata:{ 
           firstname:this.leadDataPopup['firstName'],
           lastname:this.leadDataPopup['lastName'],
           useremailaddress:this.leadDataPopup['emailAddress'],
           userrole:this.leadDataPopup['role'],
           ssoEnabled:this.leadDataPopup['ssoEnabled'],
           operationtype:'EDIT',
           vyakaradminid:this.leadDataPopup['vyakarAdminId'],
           clientuserid:this.leadDataPopup['clientUserId'],
           clientidval:this.leadDataPopup['clientId']
          }
        }
      }
        else  if (actionName == 'Delete') {
          options = {
            success:'',
            title:this.leadDataPopup['emailAddress'],
            message: 'Are you sure, you want to delete user',
            cancelText: 'Cancel',
            confirmText: 'Delete',
            popupFrom:rowData.popupFrom,
            dropdownOptions :rowData.dropdownOptions,
            dialogtype: actionName,
            formdata:{ 
             firstname:this.leadDataPopup['firstName'],
             lastname:this.leadDataPopup['lastName'],
             useremailaddress:this.leadDataPopup['emailAddress'],
             userrole:this.leadDataPopup['role'],
             ssoEnabled:this.leadDataPopup['ssoEnabled'],
             operationtype:'DELETE',
             vyakaradminid:this.leadDataPopup['vyakarAdminId'],
             clientuserid:this.leadDataPopup['clientUserId'],
             clientidval:this.leadDataPopup['clientId']
            }
          };
        }
        else  if (actionName == 'Reset') {
          options = {
            success:'',
            title:this.leadDataPopup['emailAddress'],
            message: 'Send Reset password link to ',
            cancelText: 'Cancel',
            confirmText: 'Send Link',
            popupFrom:rowData.popupFrom,
            dropdownOptions :rowData.dropdownOptions,
            dialogtype: actionName,
            formdata:{ 
             firstname:this.leadDataPopup['firstName'],
             lastname:this.leadDataPopup['lastName'],
             useremailaddress:this.leadDataPopup['emailAddress'],
             userrole:this.leadDataPopup['role'],
             ssoEnabled:this.leadDataPopup['ssoEnabled'],
             operationtype:'RESET',
             vyakaradminid:this.leadDataPopup['vyakarAdminId'],
             clientuserid:this.leadDataPopup['clientUserId'],
             clientidval:this.leadDataPopup['clientId']
            }
          };
        }
        else  if (actionName == 'Password Reset Link') {
          //console.log("rowData",rowData);
          if(rowData.ResetPasswordLinkData==""){
            // this.notifier.notify('error', 'No Data To Copy');
            this.Notification={
              showSuccess    : 'NO',
              showError      : 'YES',
              title          : 'Error',
              content        : 'No Data To Copy',
              position       : ['top','left'],
              timeOut        : 5000,
              showProgressBar: true,
              pauseOnHover   : true,
              clickToClose   : true,
            };
          }
          else{
           // console.log(rowData.ResetPasswordLinkData);
            let selBox = document.createElement('textarea');
            selBox.value = rowData.ResetPasswordLinkData;
            document.body.appendChild(selBox);
            selBox.select();
            document.execCommand('copy');
            document.body.removeChild(selBox);

            this.Notification={
              showSuccess    : 'YES',
              showError      : 'NO',
              title          : 'Success',
              content        : 'Password Reset Link Copied To Clipboard',
              position       : ['top','left'],
              timeOut        : 5000,
              showProgressBar: true,
              pauseOnHover   : true,
              clickToClose   : true,
            };
            // this.notifier.notify('success', "Password Reset Link Copied To Clipboard"); 

          }
        }
        if(actionName != 'Password Reset Link'){

          this.admindailgservice.open(options);
          this.admindailgservice.confirmed().subscribe(confirmed => {
            if (confirmed) {
              if(confirmed.operationtype == "RESET"){
               // console.log(rowData)
                let resetPasswordBody = {
                  "emailaddress":rowData.emailAddress,
                  "clientid" : rowData.clientId  
                }
               // console.log('resetPasswordBody',resetPasswordBody)
                this.clientUserService.ForgotPasswordVyakarAdmin(resetPasswordBody).subscribe(res=>{
                  rowData.ResetPasswordLinkData=res.data['ResetPasswordLinkData'];
                  if (res.success=="true") {
                    
                    this.Notification={
                      showSuccess    : 'YES',
                      showError      : 'NO',
                      title          : 'Success',
                      content        : 'Reset password link has been sent successfully',
                      position       : ['top','left'],
                      timeOut        : 5000,
                      showProgressBar: true,
                      pauseOnHover   : true,
                      clickToClose   : true,
                    };
                    // this.notifier.notify('success', "Reset password link has been sent successfully"); 
                  }
                },(error)=>console.log(error))
            }
              else{
                this.leadDataPopup.formdata=confirmed;
                 this.ClientUserUpdate(this.leadDataPopup.formdata);
          }
        }
        });
        }
       
    }
    // 5
    else  if(actionName == 'View' && rowData.popupFrom=='leadDetailReport'){
      let leadDetailGet =   {
        "emailaddress"  : sessionStorage.getItem('ClientemailAddress'),
        "x-access-token": sessionStorage.getItem('ClientToken'),
        "clientid"      : sessionStorage.getItem('Clientid'),
        "leadId"        : rowData.LeadID
      };
     
    }

    else if(actionName == 'View' && rowData.popupFrom=='accountCoverageReport'){
          console.log(rowData)
          
          let options = {
            success    : '',
            title      : 'Account Coverage Report',
            message    : '',
            cancelText : 'Cancel',
            confirmText: 'Save',
            dialogtype : actionName,
            data       : { 
              AccountID                      : rowData.AccountID,
              Name               : rowData.Name,
              BillingStreet                : rowData.BillingStreet,
              BillingCity                   : rowData.BillingCity,
              BillingState                 : rowData.BillingState,
              BillingCountry               : rowData.BillingCountry,
              Website: rowData.Website,
              AnnualRevenue                 : rowData.AnnualRevenue,
              Ownership       : rowData.Ownership,
              Inactive_account__c  : rowData.Inactive_account__c,
              Dedupe_GroupID            : rowData.Dedupe_GroupID,
              Dedupe_Status       : rowData.Dedupe_Status,
              RecordType         : rowData.RecordType,
              RemoveFromMatching             : rowData.RemoveFromMatching,
              IsDeleted               : rowData.IsDeleted,
              CreatedDate : rowData.CreatedDate
            }
          };
          this.admindailgservice.open(options);
        }
        else if(actionName == 'View' && rowData.popupFrom=='duplicateAccountReport'){
                    
          let options = {
            success    : '',
            title      : 'Duplicate Account Report',
            message    : '',
            cancelText : 'Cancel',
            confirmText: 'Save',
            dialogtype : actionName,
            data       : { 
              Id                     : rowData.Id,
              Dedupe_GroupID           :rowData.Dedupe_GroupID,
              Name               : rowData.Name,
              Website               : rowData.Website,
              BillingCity                   : rowData.BillingCity,
              BillingState                 : rowData.BillingState,
              BillingCountry               : rowData.BillingCountry,
              BillingPostalCode            : rowData.BillingPostalCode,
              BillingStreet            : rowData.BillingStreet,
              ShippingCity                   : rowData.ShippingCity,
              ShippingState                 : rowData.ShippingState,
              ShippingCountry               : rowData.ShippingCountry,
              RecordType                    :rowData.RecordType,
              CreatedDate : rowData.CreatedDate
            }
        }
        this.admindailgservice.open(options);
      }
      else if(actionName == 'View' && rowData.popupFrom=='leadsMatchedWithAccount'){
                    
        let options = {
          success    : '',
          title      : 'Leads Matched With Account',
          message    : '',
          cancelText : 'Cancel',
          confirmText: 'Save',
          dialogtype : actionName,
          data       : { 
            AccountID                     : rowData.AccountID,
            accountName           :rowData.accountName,
            MatchedLeadAngelAccountName               : rowData.MatchedLeadAngelAccountName,
            leadName                   : rowData.leadName,
            leadFirstName                 : rowData.leadFirstName,
            leadLastName               : rowData.leadLastName,
            leadCompany                   : rowData.leadCompany,
            leadWebsite                 : rowData.leadWebsite,
            leadEmail                 : rowData.leadEmail,
            RecordType               : rowData.RecordType,
            BillingCountry                    :rowData.BillingCountry,
            BillingState                    :rowData.BillingState,
            BillingCity                    :rowData.BillingCity,
            AnnualRevenue                    :rowData.AnnualRevenue,
            CreatedDate                    :rowData.CreatedDate,
          }
      }
      this.admindailgservice.open(options);
    }
    else if(actionName == 'View' && rowData.popupFrom=='leadsMatchedWithoutAccount'){
                    
      let options = {
        success    : '',
        title      : 'Leads Matched Without Account',
        message    : '',
        cancelText : 'Cancel',
        confirmText: 'Save',
        dialogtype : actionName,
        data       : { 
          Name                     : rowData.Name,
          FirstName           :rowData.FirstName,
          LastName               : rowData.LastName,
          Company                   : rowData.Company,
          Email                 : rowData.Email,
          Website               : rowData.Website,
          AnnualRevenue                   : rowData.AnnualRevenue,
          CreatedDate                 : rowData.CreatedDate,
        }
    }
    this.admindailgservice.open(options);
    }else if(actionName == 'View' && rowData.popupFrom=='leadUploadErrorReport'){
                    
      let options = {
        success    : '',
        title      : 'Lead Upload Error Report',
        message    : '',
        cancelText : 'Cancel',
        confirmText: 'Save',
        dialogtype : actionName,
        data       : { 
          LeadID                : rowData.LeadID,
          ownerName           :rowData.ownerName,
          FirstName           : rowData.FirstName,
          LastName            : rowData.LastName,
          Company             : rowData.Company,
          Email                 : rowData.Email,
          RouteStatusReason                   : rowData.RouteStatusReason,
          RoutedTimestamp                 : rowData.RoutedTimestamp,
          MatchedLeadAngelAccountName                 : rowData.MatchedLeadAngelAccountName,
          UploadFailureReason                 : rowData.UploadFailureReason,
          Createdts                 : rowData.UploadDate,
          Modifiedts                 : rowData.ModifiedDate,
          UploadStatus                 : rowData.UploadStatus,
          uploadType                 : rowData.uploadType,
        }
    }
    this.admindailgservice.open(options);
    }else if(actionName == 'View' && rowData.popupFrom=='accountUploadErrorReport'){
                    
      let options = {
        success    : '',
        title      : 'Account Upload Error Report',
        message    : '',
        cancelText : 'Cancel',
        confirmText: 'Save',
        dialogtype : actionName,
        data       : { 
          ExternalSystemType                     : rowData.ExternalSystemType,
          ExternalSystemName           :rowData.ExternalSystemName,
          UploadStatus               : rowData.UploadStatus,
          UploadFailureReason                   : rowData.UploadFailureReason,
          RecordStatus                 : rowData.RecordStatus,
          Createdts               : rowData.CreatedDate,
          Name                   : rowData.Name,
          BillingStreet                 : rowData.BillingStreet,
          BillingCity                 : rowData.BillingCity,
          BillingState                 : rowData.BillingState,
          BillingCountry                 : rowData.BillingCountry,
          Industry                 : rowData.Industry,
          Website                 : rowData.Website,
          AnnualRevenue                 : rowData.AnnualRevenue,
          Ownership                 : rowData.Ownership,
          RecordType                 : rowData.RecordType,
          RemoveFromMatching                 : rowData.RemoveFromMatching
        }
    }
    this.admindailgservice.open(options);
    }else if(actionName == 'View' && rowData.popupFrom=='routingErrorReport'){
                    
      let options = {
        success    : '',
        title      : 'Routing Error Report',
        message    : '',
        cancelText : 'Cancel',
        confirmText: 'Save',
        dialogtype : actionName,
        data       : { 
          Id                     : rowData.Id,
          LeadID           :rowData.LeadID,
          OwnerId               : rowData.OwnerId,
          ownerName                   : rowData.ownerName,
          FirstName                 : rowData.FirstName,
          LastName               : rowData.LastName,
          Email                   : rowData.Email,
          Company                 : rowData.Company,
          MatchedLeadAngelAccountName                 : rowData.MatchedLeadAngelAccountName,
          AssignmentBlockID                 : rowData.AssignmentBlockID,
          RouteStatusReason                 : rowData.RouteStatusReason,
          RoutedTimestamp                 : rowData.RoutedTimestamp,
        }
    }
    this.admindailgservice.open(options);
    }
    else if(actionName == 'View' && rowData.popupFrom=='leadSalesTeam'){
                    
      let options = {
        success    : '',
        title      : 'leadSalesTeam',
        message    : '',
        cancelText : 'Cancel',
        confirmText: 'Save',
        dialogtype : actionName,
        data       : { 
          LeadID                      : rowData.LeadID,
          FirstName               : rowData.FirstName,
          LastName                : rowData.LastName,
          Email                   : rowData.Email,
          Company                 : rowData.Company,
          MatchedLeadAngelAccountName: rowData.MatchedLeadAngelAccountName,
          AssignmentBlockID       : rowData.AssignmentBlockID,
          RouteStatusReason       : rowData.RouteStatusReason,
          RoutedTimestamp         : rowData.RoutedTimestamp,
          LeadRouterName          : rowData.LeadRouterName,
          LeadSegmentName         : rowData.SalesTeamName,
          ownerName               : rowData.ownerName,
          
        }
    }
    this.admindailgservice.open(options);
  }

  }

  public getPaginatorData(event: PageEvent) {
    this.isUpdated.emit(event)
    console.log(event)
  }

  


  mngClientUpdate(formData){
    formData.AppVersion=formData.AppVersion=="Y"?1:0
    formData.IsMALeadConfigure=formData.IsMALeadConfigure=="1"?1:0
    formData.IsPartnerConfigure=formData.IsPartnerConfigure=="1"?1:0
    formData.NextPartnerRouterRunTs = new Date(formData.NextPartnerRouterRunTs).toUTCString()
    formData.NextQuickRouterRunTs   = new Date(formData.NextQuickRouterRunTs).toUTCString()
    formData.NextRouterRunTs        = new Date(formData.NextRouterRunTs).toUTCString()
    formData.NextSegmentationRunTs  = new Date(formData.NextSegmentationRunTs).toUTCString()
    formData.ContractExpirationDate = formData.ContractExpirationDate=='Invalid Date'?'':new Date(formData.ContractExpirationDate).toUTCString()



    // delete formData.AccountIndex_1
    // delete formData.LeadIndex_1
    // delete formData.NamespacePrefix
    // delete formData.OrgId
    console.log('formData ',formData)

    this.manageClientService.manageClientUpdate(formData).subscribe((posRes:any)=>{
      if(posRes.success=="true"){
        this.Notification={
          showSuccess    : 'YES',
          showError      : 'NO',
          title          : 'Success',
          content        : posRes.data.Message,
          position       : ['top','right'],
          timeOut        : 5000,
          showProgressBar: true,
          pauseOnHover   : true,
          clickToClose   : true,
        };
        this.isUpdated.emit(this.isMngClSettUpdated=true)
        // this.notifier.notify('success', posRes.data.Message); 
        
      }else{
        this.Notification={
          showSuccess    : 'NO',
          showError      : 'YES',
          title          : 'Error',
          content        : 'Error',
          position       : ['top','right'],
          timeOut        : 5000,
          showProgressBar: true,
          pauseOnHover   : true,
          clickToClose   : true,
        };
        // this.notifier.notify('error', 'Error'); 
      }
    },error => console.error(error));
    this.isMngClSettUpdated=false
  }
  addTime(time){
    let d = new Date(time);
    d.setHours(d.getHours() + 5);
    d.setMinutes(d.getMinutes() + 30);

    return d
  }
  isArray(obj : any ) {
    return Array.isArray(obj)
  }
  isLength(obj : any){
    if(obj == null){return false}
    return obj.length>=2?true:false
  }

   onResetPasswordLink(data){
    // console.log('data',data)
    let expr='@'
    // console.log('ID :',data.passwordResetLink);
    /*console.log(data.passwordResetLink.search(expr))
    if(data.passwordResetLink.search(expr)=== -1){
      this.Client_ID=0
    }
    else{
      this.Client_ID=this.data.clientId
    }
    let forgotPasswordVyakarAdminAPIdata = {
      "emailaddress":this.data.emailAddress,
      "clientid" : this.Client_ID    
    }
    console.log('forgotPasswordVyakarAdminAPIdata',forgotPasswordVyakarAdminAPIdata)
    this.ForgotConfirmationService.ForgotPasswordVyakarAdmin(forgotPasswordVyakarAdminAPIdata).subscribe(res=>{
      if (res.success=="true") {
        this.notifier.notify('success', 'Reset password link has been sent successfully');
        this.dialogRef.close();
      }
    })*/
  }

   leadUserUpdate(formData){
    this.leadservice.insupdateDelClient(formData).subscribe((posRes)=>{
      if(posRes['success']=="true"){
        this.Notification={
          showSuccess    : 'YES',
          showError      : 'NO',
          title          : 'Success',
          content        : posRes['data'],
          position       : ['top','left'],
          timeOut        : 5000,
          showProgressBar: true,
          pauseOnHover   : true,
          clickToClose   : true,
        };
        // this.notifier.notify('success',posRes['data']); 
        this.isUpdated.emit(this.isUserandAccessUpdated=true);
      }else{
        this.Notification={
          showSuccess    : 'NO',
          showError      : 'YES',
          title          : 'Error',
          content        : posRes['data'],
          position       : ['top','right'],
          timeOut        : 5000,
          showProgressBar: true,
          pauseOnHover   : true,
          clickToClose   : true,
        };
        // this.notifier.notify('error',posRes['data']); 
      }
      },error => console.log(error));
      this.isLeadUserUpdated =false;
   }

   ClientUserUpdate(formData){
    console.log('formData ',formData)
    this.clientUserService.insertUpdtClientUser(formData).subscribe((posRes)=>{
      if(posRes['success']=="true"){
        this.Notification={
          showSuccess    : 'YES',
          showError      : 'NO',
          title          : 'Success',
          content        : posRes['data'],
          position       : ['top','left'],
          timeOut        : 5000,
          showProgressBar: true,
          pauseOnHover   : true,
          clickToClose   : true,
        };
        // this.notifier.notify('success',posRes['data']); 

        this.isUpdated.emit({'clientidval':formData.clientidval});
      }else{
        this.Notification={
          showSuccess    : 'NO',
          showError      : 'YES',
          title          : 'Error',
          content        : posRes['data'],
          position       : ['top','right'],
          timeOut        : 5000,
          showProgressBar: true,
          pauseOnHover   : true,
          clickToClose   : true,
        };
        // this.notifier.notify('error',posRes['data']); 

      }
      //this.isUpdated.emit(this.isLeadUserUpdated=true)
      },error => console.log(error));
     // this.isLeadUserUpdated =false;
   }
   CrmDataRefresh(formData){
    this.crmdataservice.getCrmUserList(formData).subscribe((posRes)=>{
      //console.log(posRes);
      if(posRes['success']=="true"){
        this.Notification={
          showSuccess    : 'YES',
          showError      : 'NO',
          title          : 'Success',
          content        : posRes.message,
          position       : ['top', 'right'],
          timeOut        : 5000,
          showProgressBar: true,
          pauseOnHover   : true,
          clickToClose   : true,
        };
        // this.notifier.notify('success', posRes.message); 
        this.isUpdated.emit("true");
    }
    },(error)=>console.log(error));
  }
}

