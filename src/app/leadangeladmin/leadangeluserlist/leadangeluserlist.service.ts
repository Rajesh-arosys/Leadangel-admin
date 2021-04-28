import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { LeadModel, popUpData } from './leadangeluserlist.model';
import ConfigData from '../../../assets/config.json'

@Injectable({
  providedIn: 'root'
})
export class LeadangeluserlistService {
  public ConfigData: any = ConfigData

  constructor(public http:HttpClient) {  }

  public getVyakarClient(): Observable<LeadModel>  {
    return this.http.post<LeadModel>(this.ConfigData.ServiceAPILink + this.ConfigData.getUserdetail,{})
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error)
        }))
}
  public insupdateDelClient(data:popUpData):Observable<popUpData>{
    return this.http.post<popUpData>(this.ConfigData.ServiceAPILink + this.ConfigData.insUserdetail,data).pipe(
      catchError((error: HttpErrorResponse) => {
        return observableThrowError(error.error)
      }));
  }
  public ForgotPasswordVyakarAdmin(data:any):Observable<any>{
    console.log(this.http.post<any>(this.ConfigData.ServiceAPILink + this.ConfigData.vyakarAdminforgetPassword,data))
    return  this.http.post<any>(this.ConfigData.ServiceAPILink + this.ConfigData.vyakarAdminforgetPassword,data)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        return observableThrowError(error.error)
      }));
  }
}