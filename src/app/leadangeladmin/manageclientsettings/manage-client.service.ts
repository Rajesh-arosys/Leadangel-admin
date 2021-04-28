import { Injectable } from '@angular/core';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import ConfigData from '../../../assets/config.json'
import { ClientDataPopupModel, ClientSettingModel, DownloadAllSettingsModel,popUpData } from './manage-client-model';

@Injectable({
  providedIn: 'root'
})
export class ManageClientService {

  public ConfigData: any = ConfigData
  public apiUrl: string
  public headers: any
  public options: any

  constructor(
    public httpClient: HttpClient,
  ) { }

  public manageClientDetail(): Observable<ClientSettingModel>  {
      return this.httpClient.post<ClientSettingModel>(this.ConfigData.ServiceAPILink + this.ConfigData.getClientdetail, {})
        .pipe(
          catchError((error: HttpErrorResponse) => {
            return observableThrowError(error.error)
          }))
  }
  public downloadAllSettingsDetail(): Observable<DownloadAllSettingsModel>  {
    return this.httpClient.post<DownloadAllSettingsModel>(this.ConfigData.ServiceAPILink + this.ConfigData.getclientmanagementsettingall, {})
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error)
        }))
  }

  //getting single detail of client
  public manageClientPopUpDetail(c_clientId): Observable<ClientDataPopupModel>  {
    return this.httpClient.post<ClientDataPopupModel>(this.ConfigData.ServiceAPILink + this.ConfigData.getManageClientSetting, c_clientId)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error)
        }))
  }

  public manageClientUpdate(data:popUpData): Observable<any>  {
    return this.httpClient.post<popUpData>(this.ConfigData.ServiceAPILink + this.ConfigData.manageClientSetting, data)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error)
        }))
  }


}
