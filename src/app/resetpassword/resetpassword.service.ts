import { Injectable } from '@angular/core';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import ConfigData from '../../assets/config.json'

@Injectable({
  providedIn: 'root'
})
export class ResetpasswordService {
  public ConfigData: any = ConfigData
  public apiUrl: string
  public headers: any
  public options: any
  constructor(public httpClient:HttpClient) { }
  
  public  ChangePassword=(changepassapicallbody)=>{
    return this.httpClient.post<any>(this.ConfigData.ServiceAPILink+this.ConfigData.updatePassword,changepassapicallbody)
    .pipe(
      catchError((error:HttpErrorResponse)=>{
        return observableThrowError(error.error)
      })
    )
  }
  public  updateLeadangelAdminPasswordServiceCall=(clientAdminchangepassapicallbody)=>{
    return this.httpClient.post<any>(this.ConfigData.ServiceAPILink+this.ConfigData.upDateclientAdminPassword,clientAdminchangepassapicallbody)
    .pipe(
      catchError((error:HttpErrorResponse)=>{
        return observableThrowError(error.error)
      })
    )
  }
  public  updateclientPasswordServiceCall=(clientAdminchangepassapicallbody)=>{
    return this.httpClient.post<any>(this.ConfigData.ServiceAPILink+this.ConfigData.upDateclientAdminPassword,clientAdminchangepassapicallbody)
    .pipe(
      catchError((error:HttpErrorResponse)=>{
        return observableThrowError(error.error)
      })
    )
  }
  public  leadangelAdminResetPasswordStatus=(changepassStatusapicallbody)=>{
    return this.httpClient.post<any>(this.ConfigData.ServiceAPILink+this.ConfigData.getleadangelAdminResetPasswordStatus,changepassStatusapicallbody)
    .pipe(
      catchError((error:HttpErrorResponse)=>{
        return observableThrowError(error.error)
      })
    )
  }

}
