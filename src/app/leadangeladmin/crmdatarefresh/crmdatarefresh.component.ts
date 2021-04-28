import { Component } from '@angular/core';
import { AadminDailogSevice } from 'src/app/common/admindailog/admindailog.service';
import { CrmdatarefreshService } from './crmdatarefresh.service';
import { CrmDataRefreshModel } from './crmdatarefresh.model';
import { DatePipe } from '@angular/common';
import { DataTableComponent } from 'src/app/common/data-table/table/data-table.module';
import { ProgressSpinnerComponent } from 'src/app/progress-spinner/progress-spinner.module';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-crmdatarefresh',
  templateUrl: './crmdatarefresh.component.html',
  styleUrls: ['./crmdatarefresh.component.scss'],
  providers: [DataTableComponent,DatePipe,ProgressSpinnerComponent]
})

export class CrmdatarefreshComponent {
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
  clientid;



  constructor(public admindailgservice:AadminDailogSevice,
     public service:CrmdatarefreshService,
     public datepipe: DatePipe,
     public notifier : NotifierService) {
      }
      public crmdetails = new CrmDataRefreshModel();
      public noRecordsFound:boolean=false;
  ngOnInit() {
    this.service.clientList().subscribe((posRes)=>{
      this.clientid=posRes.data;
    },(error)=>console.log(error));
    this.getClientDetails();
  }
 
  public   async getClientDetails(){
    console.log('crm data refresh')
    this.crmdetails.data=[]
    this.isCompleted=false
    let tableColNamesFromAPI=[]
    let tableColNamesWithSpace={}
  
    this.crmdetails = await  this.service.getCrmUserList({'operationtype':"GET"}).toPromise()
    console.log(this.crmdetails);
    if (this.crmdetails.success=="true") {
      if(this.crmdetails.data.length>0){
      let i=0
      let Actions=['Edit',"Execute",'Delete']
      let actionIcon=['edit',"published_with_changes",'delete']
      //let iconColor=['successtext','successtext','successtext']
      // this.crmdetails.data.forEach(v => {
      //   delete v.Action
      // });
      this.crmdetails.data.forEach(element => {
        // element.Action=element.Action
        element.Actions=Actions
        element.actionIcon=actionIcon
        element.popupFrom='CrmdatarefreshComponent'
        // element.SNo=i+1
        // i+=1
        element.Createdts=element.Createdts==null?'':(element.Createdts)
        element.Completedts=element.Completedts==null?'':(element.Completedts)
        element.Startedts=element.Startedts==null?'':(element.Startedts)
        element.FilterCondition=element.FilterCondition==null?'':element.FilterCondition.charAt(0).toUpperCase()+ element.FilterCondition.slice(1)
        element.Status=element.Status==null?'':element.Status.charAt(0).toUpperCase()+ element.Status.slice(1)
        element.ExternalSystemType=element.ExternalSystemType==null?'':element.ExternalSystemType.charAt(0).toUpperCase()+ element.ExternalSystemType.slice(1)
      });
   
      
      tableColNamesFromAPI=Object.keys(this.crmdetails.data[0])
      for(let i=0;i<tableColNamesFromAPI.length;i++){
        tableColNamesWithSpace[tableColNamesFromAPI[i]] = this.insertSpaces(tableColNamesFromAPI[i])
      }
      this.columnHeader=tableColNamesWithSpace
      this.columnHeader.MaintenanceId='Id'
      delete this.columnHeader.actionIcon
      delete this.columnHeader.popupFrom
      delete this.columnHeader.iconColor
      delete this.columnHeader.ModifiedBy
      delete this.columnHeader.CreatedBy
      // delete this.columnHeader.MaintenanceId
      delete this.columnHeader.Modifiedts
      // delete this.columnHeader.SNo
      // delete this.columnHeader.Action

      
     
        this.dataForFiter=this.crmdetails.data
        this.dataForTable= this.crmdetails.data
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
      this.getClientDetails();
  }


  addCrmDailog(item: any, action: string,popupFrom){
    let options: any
    if (action == 'add_crm_dialog_users') {
      options = {
        title:'CRM Data Refresh Details',
        message: '',
        popupFrom:popupFrom,
        clientid:this.clientid,
        cancelText: 'Cancel',
        confirmText: 'Save',
        dialogtype: action,
        formdata:{ 
          c_clientid :null,
          externalsystemtype : '',
          action : '',
          filtercondition:'',
          operationtype:"ADD"}
      };
     
    }
  this.admindailgservice.open(options);

    this.admindailgservice.confirmed().subscribe(confirmed => {
      console.log("confirmed",confirmed);
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
        if(action=='add_crm_dialog_users'){ 
          delete confirmed["maintenanceid"];}
        this.service.getCrmUserList(confirmed).subscribe((posRes)=>{
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
            this.getClientDetails();
        }
        },(error)=>console.log(error));
      }
    });
  }

  isArray(obj : any ) {
    return Array.isArray(obj)
  } 

  tableFilterRec(filteredData){
    let i=0
    let Actions=['Edit',"Execute",'Delete']
    let actionIcon=['edit',"published_with_changes",'delete']
  //  let iconColor=['successtext','successtext','successtext']
    filteredData.forEach(element => {
      element.SNo=i+1
      element.Actions=Actions
      element.actionIcon=actionIcon
    //  element.iconColor=iconColor
      element.popupFrom='CrmdatarefreshComponent'
      i+=1
    });
    this.dataForTable=filteredData
    this.noRecordsFound=this.dataForTable.length==0?true:false
  } 
}
