import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImpersonateloginComponent } from './impersonatelogin.component';

const routes: Routes = [{ path: '', component: ImpersonateloginComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpersonateloginRoutingModule { }
  