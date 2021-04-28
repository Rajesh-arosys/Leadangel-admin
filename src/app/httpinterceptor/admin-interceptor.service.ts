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
export class AdminInterceptorService implements HttpInterceptor{
  constructor(private router: Router,private sharedService:SharedService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.log('request Admin inter',request)
    if(request.url.includes('fogetpassword')){
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
    // console.log('request Admin inter else 1',request.body)

    request = request.clone({
      headers : new HttpHeaders({
              "Content-Type":"application/json",
              "Cache-Control":"private,max-age=0,no=cache",
              "Pragma":"no-cache"
             
      }),
      body: {...request.body, 
                "clientid": !sessionStorage.getItem('clientid') ? "" : sessionStorage.getItem('clientid') ,
                "emailaddress": !sessionStorage.getItem('emailaddress') ? "" : sessionStorage.getItem('emailaddress'),
                "x-access-token": !sessionStorage.getItem('token') ? "" : sessionStorage.getItem('token')
      
       }
    })
    // console.log('request Admin inter else 2',request.body)
   
    
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
