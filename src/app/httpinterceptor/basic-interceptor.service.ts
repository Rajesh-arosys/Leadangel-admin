import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent,HttpHeaders ,HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { SharedService } from '../common/shared.service';

@Injectable({
  providedIn: 'root'
})
export class BasicInterceptorService implements HttpInterceptor{
  constructor(private router: Router,private sharedService:SharedService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.log('request basic inter',request)
    if(!localStorage.getItem('clientid')||request.url.includes('fogetpassword') ||request.url.includes('authenticate')||request.url.includes('resetpasswordadmin')||request.url.includes('changepassword') || request.url.includes('checkdomain')){
    request = request.clone({
      headers : new HttpHeaders({
              "Content-Type":"application/json",
              "Cache-Control":"private,max-age=0,no=cache",
              "Pragma":"no-cache"
      }),
      body: {...request.body,              
      
       }
      
    })
  }else{
    request = request.clone({
      headers : new HttpHeaders({
              "Content-Type":"application/json",
              "Cache-Control":"private,max-age=0,no=cache",
              "Pragma":"no-cache"
             
      }),
      body: {...request.body, 
                "clientid": !localStorage.getItem('clientid') ? "" : localStorage.getItem('clientid') ,
                "emailaddress": !localStorage.getItem('emailaddress') ? "" : localStorage.getItem('emailaddress'),
                "x-access-token": !localStorage.getItem('token') ? "" : localStorage.getItem('token')
      
       }
    })
   
    
  }
   
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
           
             if(!event.body.tokenstatus){
              // this.router.navigateByUrl('/login')
             }
                         
            
          }
          return event;
      }));
  }

  
}
