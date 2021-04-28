import { Injectable } from '@angular/core';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import ConfigData from '../../../assets/config.json'

@Injectable({
  providedIn: 'root'
})
export class ImpersonateService {

  public ConfigData: any = ConfigData
  public apiUrl: string
  public headers: any
  public options: any

constructor( public httpClient: HttpClient,) { }

public getClientDeatil(body): Observable<any>  {
  return this.httpClient.post<any>(this.ConfigData.ServiceAPILink + this.ConfigData.getClientdetail, body)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        return observableThrowError(error.error)
      }))
}

public getClientAdminDeatil(body): Observable<any>  {
  return this.httpClient.post<any>(this.ConfigData.ServiceAPILink + this.ConfigData.getClientAdmindetail, body)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        return observableThrowError(error.error)
      }))
}

public ImpersonateLogin(body): Observable<any>  {
  return this.httpClient.post<any>(this.ConfigData.ServiceAPILink + this.ConfigData.impersonatelogin, body)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        return observableThrowError(error.error)
      }))
}

}
