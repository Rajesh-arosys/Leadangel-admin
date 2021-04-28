import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';

// import { SidenavModule } from '../sidenav/sidenav.module';
import { AuthGuard } from '../gaurd/authgaurd.service';

const routes: Routes = [  
  { path: '',    component: LoginComponent},
  { path: 'client-login',    component: LoginComponent},
 ];  

@NgModule({
  imports: [RouterModule.forChild(routes)
    
  ],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
