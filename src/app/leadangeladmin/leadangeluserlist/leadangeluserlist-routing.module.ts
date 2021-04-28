import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeadangeluserlistComponent } from './leadangeluserlist.component';
const routes: Routes = [{ path: '', component: LeadangeluserlistComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeadangeluserlistRoutingModule { }
