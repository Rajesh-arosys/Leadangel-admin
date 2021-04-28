import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Injector } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BasicInterceptorService } from './httpinterceptor/basic-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
import { Idle } from '@ng-idle/core';
import { MatDialogModule } from '@angular/material/dialog';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ForgotpassModule } from './common/forgotpass/forgotpass.module';
import { ProgressSpinnerModule } from 'src/app/progress-spinner/progress-spinner.module';
import { NotifierModule,NotifierOptions } from "angular-notifier";
import { LoginModule } from './login/login.module';
import { InputCheckDirective } from './directives/input-check/input-check.directive';
import { AppInjector } from './app.injector';

const customNotifierOptions: NotifierOptions = {
  position: {
		horizontal: {
			position: 'right',
			distance: 12
		},
		vertical: {
			position: 'top',
			distance: 12,
			gap: 10
		}
	},
  theme: 'material',
  behaviour: {
    autoHide: 3000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: false,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};

@NgModule({
  declarations: [
    AppComponent,
    PagenotfoundComponent,
    InputCheckDirective
  ],
  imports: [
    BrowserModule,  
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ForgotpassModule,
    NotifierModule.withConfig(customNotifierOptions),
    NgIdleKeepaliveModule.forRoot(),
    LoginModule,
	ProgressSpinnerModule
  ],
  
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: BasicInterceptorService, multi: true},

    {provide: LocationStrategy, useClass:HashLocationStrategy},
    CookieService,
    Idle,
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  
})
//export class AppModule { }
export class AppModule {
  constructor(injector: Injector) {
    AppInjector.injector = injector;
  }
}
