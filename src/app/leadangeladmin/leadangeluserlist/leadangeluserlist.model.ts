export class leaduserDataPopup {
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
  ssoEnabled:number
  operationtype: string
  vyakaradminid:string
}
export class LeadModel {
  message(message: any) {
    throw new Error('Method not implemented.')
  }
  public success: string
  public data: Array<leadlist>
  tokenstatus: boolean
}
export class leadlist {
  public firstName : string
  public lastName : string
  public emailAddress : string
  public userstatus : string
  public role: string
  public clientPartnerId : string
  public PasswordLink: string
  public passwordResetLink : string
  public ResetPasswordLinkData : string;
  public Actions 
  public SNo       : number
  public clientUserId:number
  public clientId : number
  public vyakarAdminId:string
  actionIcon: string[]
  iconColor: string[]
  popupFrom: string
}