import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageclientsettingsComponent } from './manageclientsettings.component';

const routes: Routes = [{ path: '', component: ManageclientsettingsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageclientsettingsRoutingModule { }
