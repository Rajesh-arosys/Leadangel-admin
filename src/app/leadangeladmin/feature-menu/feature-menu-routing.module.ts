import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeatureMenuComponent } from './feature-menu.component';

const routes: Routes = [{ path: '', component: FeatureMenuComponent }];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureMenuRoutingModule { }