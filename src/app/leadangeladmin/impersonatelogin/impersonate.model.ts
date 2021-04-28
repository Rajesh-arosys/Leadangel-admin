export class clientModel {

    public ClientDeatil : Array <{clientId:any,clientName:string}>

}

export class impersonateLoginDeatilModel {

    clientId:any
    role:string;
    emailAddress:string
    clientUserId:any
  }

  export class clientUserModel {

    public ClientUserDeatil : Array <{firstName:string,lastName:string,emailAddress:string}>

}