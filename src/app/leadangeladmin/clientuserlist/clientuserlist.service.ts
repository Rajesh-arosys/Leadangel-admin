import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry } from 'rxjs/operators';
import { Observable, throwError as observableThrowError } from 'rxjs';
import ConfigData from '../../../assets/config.json'
import { LeadModel } from '../leadangeluserlist/leadangeluserlist.model';
import { ClientUserModel } from './clientuserlist.model';

@Injectable({
  providedIn: 'root'
})

export class ClientUserListService {
  public ConfigData: any = ConfigData

  constructor(public http:HttpClient) { }

  public clientList():Observable<ClientUserModel>{
    return this.http.post<ClientUserModel>(this.ConfigData.ServiceAPILink + this.ConfigData.getClientdetail,{}).pipe(
      catchError((error: HttpErrorResponse) => {
        return observableThrowError(error.error)
      }));
  }
  public  getclientUserList(data): Observable<LeadModel>  {
    return this.http.post<LeadModel>(this.ConfigData.ServiceAPILink + this.ConfigData.getClientAdmindetail,data)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error)
        }))
}
  public insertUpdtClientUser(data:popUpData):Observable<popUpData>{
    return this.http.post<popUpData>(this.ConfigData.ServiceAPILink + this.ConfigData.insClientAdmindetail,data).pipe(
      catchError((error: HttpErrorResponse) => {
        return observableThrowError(error.error)
      }));
  }
  public ForgotPasswordVyakarAdmin(data:any):Observable<any>{
    return this.http.post<any>(this.ConfigData.ServiceAPILink + this.ConfigData.vyakarAdminforgetPassword,data).pipe(
      catchError((error: HttpErrorResponse) => {
        return observableThrowError(error.error)
      }));
  }
  
}

export class popUpData{
  userrole: string
  firstname: string
  lastname: string
  useremailaddress : string
  clientuserid:number
  ssoEnabled:number
  operationtype: string
}