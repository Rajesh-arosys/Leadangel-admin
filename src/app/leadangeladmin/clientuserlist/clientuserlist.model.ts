export class ClientUserModel {
  public success: string
  public data: Array<ClientUserList>
}
export class ClientUserList {
  public ClientType: string
  public DbName    : string
  public Email     : string
  public clientId  : number
  public clientName: string
  public rowNumber : number
}