import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminloginComponent } from './adminlogin.component';
import{LeadangeladminModule} from '../leadangeladmin/leadangeladmin.module';

const routes: Routes = [{ path: '', component: AdminloginComponent },
{ path: 'leadangeladmin', loadChildren: () => import('../leadangeladmin/leadangeladmin.module').then(m => m.LeadangeladminModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminloginRoutingModule { }
