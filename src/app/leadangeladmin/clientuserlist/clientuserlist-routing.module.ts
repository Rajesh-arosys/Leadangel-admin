import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientuserlistComponent } from './clientuserlist.component';

const routes: Routes = [{ path: '', component: ClientuserlistComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientuserlistRoutingModule { }
