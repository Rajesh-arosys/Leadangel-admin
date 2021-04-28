export class CrmdataPopup {
  public confirmText: string
  public cancelText : string
  public message    : string
  public title      : string
  public dialogtype : string
  public popupFrom :  string
  public success    : string
  public dropdownOptions : any
  public formdata   : popUpData
}

export class popUpData{
  userrole: string
  firstname: string
  lastname: string
  useremailaddress : string
  clientuserid:number
  clientidval:number
  operationtype: string
}

export class CrmDataRefreshModel {
  public success: string
  public data: Array<crmlist>
}
export class crmlist {
  public SNo               : number
  public ClientId          : number
  public Completedts       : string
  public ExternalSystemType: string
  public FilterCondition   : string
  public MaintenanceId     : number
  public Action
  public Operation : string
  public Status    : string
  public Modifiedts: string
  public Startedts : string
         actionIcon: string[]
         iconColor : string[]
         popupFrom : string
  Createdts
  CreatedBy
  ModifiedBy
  Actions: string[]
}
