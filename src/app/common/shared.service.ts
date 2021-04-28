import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SharedService {


  Configdata = new BehaviorSubject<any>('');
  
  globalVar: any
  activeObject:any
  rightAttributeParentData = {}
  
  emailAddress:string
  clientId:string|number
  public canvasValidationCheck:boolean = true
  public customFilterValidationCheck:boolean = true

  public selectStatus = new BehaviorSubject<any>({status: false});


  constructor(private httpClient: HttpClient) {
    
  }

  loadConfigData =()=>{
    this.httpClient.get("assets/config.json").subscribe(data =>{
       this.Configdata.next(data)  
           
    })
  }
  
  errorHandl(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } 
    else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }


  getEmptySelect() {
    return this.selectStatus.asObservable();
  }

  setEmptySelect(user: any) {
    this.selectStatus.next(user);
  }
   
}

  
