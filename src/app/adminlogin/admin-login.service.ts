import { Injectable } from '@angular/core';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import ConfigData from '../../assets/config.json'
import { AdminLogin, AdminLoginSuccessModel } from './admin-login.model'
import * as CryptoJS from 'crypto-js';


@Injectable({
  providedIn: 'root'
})
export class AdminLoginService {
  public ConfigData: any = ConfigData
  public apiUrl: string
  public headers: any
  public options: any 


  constructor(public httpClient: HttpClient) { }

  public loginCheck(loginApiCallBody): Observable<AdminLoginSuccessModel> {
    return this.httpClient.post<AdminLoginSuccessModel>(this.ConfigData.ServiceAPILink + this.ConfigData.loginUrl, loginApiCallBody)
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
