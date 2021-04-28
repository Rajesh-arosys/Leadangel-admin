
import { Injectable } from '@angular/core';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import ConfigData from '../../assets/config.json'
import { loginSuccessModel } from './login.model';
import * as CryptoJS from 'crypto-js';


@Injectable({
  providedIn: 'root'
})

export class LoginService {

 public ConfigData: any = ConfigData
 public apiUrl: string
 public headers: any
 public options: any 

  constructor(public httpClient: HttpClient) { }

  public loginCheck(loginApiCallBody): Observable<loginSuccessModel> {
    return this.httpClient.post<loginSuccessModel>(this.ConfigData.ServiceAPILink + this.ConfigData.loginUrl, loginApiCallBody)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error)
        }))
  }

  public loginSSOCheck(loginApiCallBody): Observable<any> {
    console.log("loginApiCallBody " , loginApiCallBody)
    return this.httpClient.post<any>(this.ConfigData.ServiceAPILink + this.ConfigData.ssoLoginUrl,loginApiCallBody)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error)
        }))
  }
  public ssoLoginRedirect(){
      window.location.replace(this.ConfigData.ServiceAPILink + this.ConfigData.ssoRedirect);
  }
  public getconfigdetails(loginApiCallBody): Observable<loginSuccessModel> {
    return this.httpClient.post<loginSuccessModel>(this.ConfigData.ServiceAPILink + this.ConfigData.getconfigdetails, loginApiCallBody)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error)
        }))
  }

  set(keys, value){
    var key = CryptoJS.enc.Utf8.parse(keys);
    var iv = CryptoJS.enc.Utf8.parse(keys);
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()), key,
    {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return encrypted.toString();
  }

  //The get method is use for decrypt the value.
  get(keys, value){
    var key = CryptoJS.enc.Utf8.parse(keys);
    var iv = CryptoJS.enc.Utf8.parse(keys);
    var decrypted = CryptoJS.AES.decrypt(value, key, {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}

