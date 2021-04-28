import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ClientUserListService } from 'src/app/leadangeladmin/clientuserlist/clientuserlist.service';
import { DownloadCsvComponent } from '../download-csv/download-csv.component';
import { DatePipe } from '@angular/common';



interface Role {
  value: string;
  viewValue: string;
}
  
@Component({
  selector: 'app-admindailog',
  templateUrl: './admindailog.component.html',
  styleUrls: ['./admindailog.component.scss'],
  providers: [DownloadCsvComponent,DatePipe]
})

export class AdmindailogComponent implements OnInit {
  public dialogDefinedData: any
  public enroll:FormGroup;
  public crmData:FormGroup;
  dropdownOptions=[];
  public mngClientPopUp:FormGroup;
  // public clientDataPopup = new ClientDataPopupModel();  //model
  public mngClSettingDwnldData
  public srName
  public ProgressSpinnermode = 'indeterminate';
  public displayProgressSpinner = true

    // csv download data
    csvData      : any   = []
    csvHeader    : any   = []
    title        :any    = ''
    fileName     :any    = ''
    buttonName   :any    = ''
    isDownloaded:boolean = false

    disableDwnld:boolean = false

    loader :boolean = false

    componentName:string = 'mangClientSetPopup'

    public conDate:any
    public date:any
    public mnth:any
    public day:any
    public hours:any
    public minutes:any



  emailpattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$";
  alphaWithWithSpace="^[A-Za-z]+([ ]?[A-Za-z])*$";
  roles: Role[] = [
    {value: 'Standard User', viewValue: 'Standard User'},
    {value: 'Admin', viewValue: 'Admin'}
  ];
  config = {
    displayKey:`displayThisKey`, 
    height: '470px' ,
    placeholder:' Select Client Name ' ,
    customComparator: ()=>{this.dropdownOptions.forEach((opt)=>{
      opt['displayThisKey'] = `${opt.clientId}- ${opt.clientName}`
    })}, 
    noResultsFound: 'No results found!', 
  }
    constructor(
      public service: ClientUserListService ,
      public fb:FormBuilder, 
      @Inject(MAT_DIALOG_DATA) public data, 
      private mdDialogRef: MatDialogRef<AdmindailogComponent>,
      public datepipe: DatePipe) {
    }
    
    ngOnInit() {
      console.log('admin dialogue component ',this.data)

      this.buttonName   = 'Download' // this variable name is passed to scv download component

      // initialize data for manage client settings dialog form 
      if(this.data.dialogtype == "Setting"){
        this.manageClientSettings(this.data)
      }

      // initialize data for lead angel user list EDIt - New-Delete
      if(this.data.popupFrom == 'LeadangeluserlistComponent'){
        this.leadAngelUserListEdit(this.data)
      }

       //initialize data for client user list EDIt - New-Delete
       if(this.data.popupFrom == 'ClientuserlistComponent'){
        this.roles.push({value: 'ReadOnly', viewValue: 'Read Only'});
        this.clientUserList(this.data)
      }
       //initialize data for crm data refresh
       if(this.data.popupFrom == 'CrmdatarefreshComponent'){
        this.crmDataRefresh(this.data)
      }
      
      // initialize data for  user and access users list New or Edit or Delete or reset
      if(this.data.popupFrom=='UserAndAccessComponent'){
        this.roles.push({value: 'ReadOnly', viewValue: 'Read Only'});
        this.userandaccessEdit(this.data)
      }

      // initialize data for lead detail report
      if(this.data.dialogtype == "View" && this.data.title == 'Lead Detail Report'){
          console.log('Lead Detail Report ',this.data)
      }

      // initialize data for lead detail report
      if(this.data.dialogtype == "addFeatureMenu"){
          console.log('Lead Detail Report ',this.data);
      }

      // initialize data for lead detail report
      if(this.data.dialogtype == "View" && this.data.title == 'Lead Routing Report'){
        console.log('Lead Routing Report ',this.data)
      }

      // initialize data for  srAccMappingr Edit or Delete
      if(this.data.popupFrom=='srAccMapping'){
        this.srName=this.data.data.SalesRepName
        this.getSalesRepNames()
      }

      // New Feature Menu popup 
      if(this.data.popupFrom == 'newFeatureMenu' ){
        console.log("popup")
      }

      //commented to remove extra api calls-hari/rani
      // this.service.clientList().subscribe((posRes)=>{
      //   this.dropdownOptions=posRes['data'];
      // },error => console.log(error));
    }

    // form data for client user list New or Edit or Delete
    clientUserList(data){
      console.log('data ',data)     
        this.enroll = this.fb.group({
          userrole : new FormControl(data.formdata['userrole'],[Validators.required]),
          firstname : new FormControl(data.formdata['firstname'],[Validators.required,Validators.pattern(this.alphaWithWithSpace)]),
          lastname : new FormControl(data.formdata['lastname'],[Validators.required,Validators.pattern(this.alphaWithWithSpace)]),
          useremailaddress : new FormControl(data.formdata['useremailaddress'],[Validators.required,Validators.pattern(this.emailpattern)]),
          operationtype: new FormControl(data.formdata['operationtype']),
          clientidval : new FormControl(data.formdata['clientidval'],[Validators.required]),
          ssoEnabled : new FormControl(data.formdata['ssoEnabled']),
          vyakaradminid: new FormControl(data.formdata['vyakaradminid']),
          clientuserid: new FormControl(data.formdata['clientuserid'])
        });
        console.log('enroll ',this.enroll.controls)
    }
  // form data for user and access New or Edit or Delete

    userandaccessEdit(data){
      console.log('data ',data)
      this.enroll = this.fb.group({
        userrole : new FormControl(data.data['userrole'],[Validators.required]),
        firstname : new FormControl(data.data['firstname'],[Validators.required,Validators.pattern(this.alphaWithWithSpace)]),
        lastname : new FormControl(data.data['lastname'],[Validators.required,Validators.pattern(this.alphaWithWithSpace)]),
        useremailaddress : new FormControl(data.data['useremailaddress'],[Validators.required,Validators.pattern(this.emailpattern)]),
        ssoEnabled: new FormControl(data.data['ssoEnabled']),
        operationtype: new FormControl(data.data['operationtype']),
        clientuserid: new FormControl(data.data['clientuserid'])
      });
    }

    // from data fro manage client settings
    manageClientSettings(data){
      this.mngClientPopUp = this.fb.group({
        ClientID                  : new FormControl(data.data['ClientID'],[Validators.required]),
        ClientType                : new FormControl(data.data['ClientType'],[Validators.required]),
        Router                    : new FormControl(data.data['Router'],[Validators.required]),
        FreeUserRun               : new FormControl(data.data['FreeUserRun'],[Validators.required]),
        Segmentation              : new FormControl(data.data['Segmentation'],[Validators.required]),
        PartnerRouter             : new FormControl(data.data['PartnerRouter'],[Validators.required]),
        DataAppend                : new FormControl(data.data['DataAppend'],[Validators.required]),
        FreeRoutingLimit          : new FormControl(data.data['FreeRoutingLimit'],[Validators.required]),
        CRMIsValid                : new FormControl(data.data['CRMIsValid'],[Validators.required]),
        ExternalCRMSystem         : new FormControl(data.data['ExternalCRMSystem'],[Validators.required]),
        MAIsValid                 : new FormControl(data.data['MAIsValid'],[Validators.required]),
        ExternalMASystem          : new FormControl(data.data['ExternalMASystem'],[Validators.required]),
        MatchLevel                : new FormControl(data.data['MatchLevel'],[Validators.required]),
        SFDCIntegration           : new FormControl(data.data['SFDCIntegration'],[Validators.required]),
        AssignmentBlockLimit      : new FormControl(data.data['AssignmentBlockLimit'],[Validators.required]),
        QuickRouterRunTimeInterval: new FormControl(data.data['QuickRouterRunTimeInterval'],[Validators.required]),
        RouterTimeInterval        : new FormControl(data.data['RouterTimeInterval'],[Validators.required]),
        SegmentationTimeInterval  : new FormControl(data.data['SegmentationTimeInterval'],[Validators.required]),
        ParterRouterTimeInterval  : new FormControl(data.data['ParterRouterTimeInterval'],[Validators.required]),
        OrgId                     : new FormControl(data.data['OrgId'],[Validators.required]),
        NamespacePrefix           : new FormControl(data.data['NamespacePrefix'],[Validators.required]),
        NextQuickRouterRunTs      : new FormControl(new Date(data.data['NextQuickRouterRunTs']),[Validators.required]),
        NextRouterRunTs           : new FormControl(new Date(data.data['NextRouterRunTs']),[Validators.required]),
        NextSegmentationRunTs     : new FormControl(new Date(data.data['NextSegmentationRunTs']),[Validators.required]),
        NextPartnerRouterRunTs    : new FormControl(new Date(data.data['NextPartnerRouterRunTs']),[Validators.required]),
        SendAlertMail             : new FormControl(data.data['SendAlertMail'],[Validators.required]),
        AppVersion                : new FormControl(data.data['AppVersion'],[Validators.required]),
        LeadIndex_1               : new FormControl(data.data['LeadIndex_1'],[Validators.required]),
        AccountIndex_1            : new FormControl(data.data['AccountIndex_1'],[Validators.required]),
        UseCustomRule             : new FormControl(data.data['UseCustomRule'],[Validators.required]),
        IsMALeadConfigure         : new FormControl(data.data['IsMALeadConfigure'],[Validators.required]),
        IsPartnerConfigure        : new FormControl(data.data['IsPartnerConfigure'],[Validators.required]),
        ContractExpirationDate    :new FormControl(new Date(data.data['ContractExpirationDate']),[Validators.required]),
        c_clientId                : new FormControl(data.data['c_clientId'],[Validators.required]),
      });
      console.log('NextQuickRouterRunTs ',data.data.NextQuickRouterRunTs)
    }

    // from data fro  lead angel user list edit-new-delete
    leadAngelUserListEdit(data){
      this.enroll = this.fb.group({
        userrole : new FormControl(data.formdata['userrole'],[Validators.required]),
        firstname : new FormControl(data.formdata['firstname'],[Validators.required,Validators.pattern(this.alphaWithWithSpace)]),
        lastname : new FormControl(data.formdata['lastname'],[Validators.required,Validators.pattern(this.alphaWithWithSpace)]),
        useremailaddress : new FormControl(data.formdata['useremailaddress'],[Validators.required,Validators.pattern(this.emailpattern)]),
        operationtype: new FormControl(data.formdata['operationtype']),
        vyakaradminid: new FormControl(data.formdata['vyakaradminid'])
      });
    }



    addUser(){
      this.mdDialogRef.close(this.enroll.value);
    }
    updateSetting(data){
      // console.log(this.mngClientPopUp.value)
      let confirmed={
        data:data,
        formdata:this.mngClientPopUp.value
      }
      this.mdDialogRef.close(confirmed);
    }
    countKeys(event){
      if (event.key == '.' || event.key == '-' || event.key == '+' ||event.key == 'e' || event.key == 'E') {
      event.preventDefault();
      }
    }
 
     // downloading single client details -> manage client settings popup
    download(data){
      console.log(data)
      console.log(this.data.data)

      delete this.data.data.c_clientId

      let value1// it reoresents key names
      let value2// it representd values
      let array=[]
      this.loader = true;
      let csvHeader =["Setting Name", "Setting Value"]
      this.mngClSettingDwnldData=this.data.data 

      // replacing T and Z from time stapm to show correct utc date

      this.mngClSettingDwnldData.ContractExpirationDate = new Date(this.mngClSettingDwnldData.ContractExpirationDate).toLocaleString()
      this.mngClSettingDwnldData.NextPartnerRouterRunTs = new Date(this.mngClSettingDwnldData.NextPartnerRouterRunTs).toLocaleString()
      this.mngClSettingDwnldData.NextQuickRouterRunTs = new Date(this.mngClSettingDwnldData.NextQuickRouterRunTs).toLocaleString()
      this.mngClSettingDwnldData.NextRouterRunTs = new Date(this.mngClSettingDwnldData.NextRouterRunTs).toLocaleString()
      this.mngClSettingDwnldData.NextSegmentationRunTs = new Date(this.mngClSettingDwnldData.NextSegmentationRunTs).toLocaleString()



      value1=Object.keys(this.mngClSettingDwnldData)
      //console.log('value1 ',value1)
      value2= Object.values(this.mngClSettingDwnldData)
      //console.log('value2 ',value2)

      for(let i=0; i<Object.keys(this.mngClSettingDwnldData).length; i++){
        let obj = { "key1": this.insertSpaces(value1[i]), "key2": value2[i]==null?'':value2[i]};
        array.push(obj);
      }
      console.log('array ',array)
      // const index1=array.findIndex(ele => ele.key1 == 'Is MA Lead Configure')
      // array[index1].key2=array[index1].key2=='0'?'N':'Y'
      // const index2=array.findIndex(ele => ele.key1 == 'Is Partner Configure')
      // array[index2].key2=array[index2].key2=='0'?'N':'Y'
      const index3=array.findIndex(ele => ele.key1 == 'App Version')
      array[index3].key2=array[index3].key2=='Y'?'1':'0'

        this.csvData      = array
        this.csvHeader    = csvHeader
        this.title        = 'Manage Client Setting Details  For Client : '+ this.mngClSettingDwnldData.ClientID
        this.buttonName   = 'Download'
        this.fileName     = "Manage Client Setting Details For Client "+this.mngClSettingDwnldData.ClientID
        this.isDownloaded = true
        this.loader = false;
        let confirmed={
          data:data,
          formdata:''
        }
        this.mdDialogRef.close(confirmed);
    
    } 
    insertSpaces(string) {
      string = string.replace(/([a-z])([A-Z])/g, '$1 $2');
      string = string.replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
      return string;
    }
    // converts time in UTC
    private getNowUTC(date) {
      const now = new Date(date);
      return new Date(now.getTime() + (now.getTimezoneOffset() * 60000));
    }

    public async getSalesRepNames(){
      let Getactiontypevalueapicall =   {
        "emailaddress"  : sessionStorage.getItem('ClientemailAddress'),
        "x-access-token": sessionStorage.getItem('ClientToken'),
        "clientid"      : sessionStorage.getItem('Clientid'),
        "operationtype": "ATSR"
      };
    }
    // sraffinity
    onSubmit() {
      // console.log('srName',this.srName)
      // let index=this.SrAcMappingAction.data.findIndex(item => item.Name === this.srName)
      // let id=this.SrAcMappingAction.data[index].Id
      // let dialogData={
      //   id:id,
      //   confirmed:true,
      //   operationtype:this.data.dialogtype
      // }
      // this.mdDialogRef.close(dialogData);
    }
    deleteSRA(){
      let dialogData={
        confirmed:true,
        operationtype:this.data.dialogtype
      }
      this.mdDialogRef.close(dialogData);
    }
       // form data for crm data refresh
   crmDataRefresh(data){
    console.log("data",data);
    this.crmData = this.fb.group({
      c_clientid : new FormControl(data.formdata['c_clientid'],[Validators.required]),
     action:new FormControl(data.formdata['action']),
      externalsystemtype:new FormControl(data.formdata['externalsystemtype']),
      filtercondition:new FormControl(data.formdata['filtercondition'],[Validators.required]),
      operationtype:new FormControl(data.formdata['operationtype']),
      maintenanceid:new FormControl(data.formdata['maintenanceid']),
    });
  }







 

  

  crmOut(){
    if(this.crmData.value['operationtype']!="DELETE"&&this.crmData.value['operationtype']!="EXECUTE"){
      if( this.crmData.value['action']==""){
        this.crmData.value['action']="1"
      }
      if( this.crmData.value['externalsystemtype']=="")
      {
        this.crmData.value['externalsystemtype']="CRM";
      }
    }
   this.mdDialogRef.close(this.crmData.value);
  }

  
 
  
  
 


}
