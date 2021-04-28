import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrmdatarefreshComponent } from './crmdatarefresh.component';

const routes: Routes = [{ path: '', component: CrmdatarefreshComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrmdatarefreshRoutingModule { }
