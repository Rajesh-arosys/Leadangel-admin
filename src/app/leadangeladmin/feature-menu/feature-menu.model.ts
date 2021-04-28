export class FeatureMenu {
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
