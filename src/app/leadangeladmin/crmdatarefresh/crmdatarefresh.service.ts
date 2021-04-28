import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { Observable, throwError as observableThrowError } from 'rxjs';
import ConfigData from '../../../assets/config.json'
@Injectable({
  providedIn: 'root'
})
export class CrmdatarefreshService {
  public ConfigData: any = ConfigData
 constructor(public http:HttpClient) { }

  public getCrmUserList(data):Observable<any>{
    return this.http.post<any>(this.ConfigData.ServiceAPILink + this.ConfigData.clientmaintenanceoperation,data)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error)
        }))
  } 
  public clientList():Observable<any>{
    return this.http.post<any>(this.ConfigData.ServiceAPILink + this.ConfigData.getClientdetail,{}).pipe(
      catchError((error: HttpErrorResponse) => {
        return observableThrowError(error.error)
      }));
  }
}