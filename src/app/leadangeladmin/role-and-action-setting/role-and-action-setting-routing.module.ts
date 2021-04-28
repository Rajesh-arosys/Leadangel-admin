import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoleAndActionSettingComponent } from './role-and-action-setting.component';

const routes: Routes = [{ path: '', component: RoleAndActionSettingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleAndActionSettingRoutingModule { }
