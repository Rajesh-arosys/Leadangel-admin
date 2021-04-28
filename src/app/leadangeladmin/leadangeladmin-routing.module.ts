import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeadangeladminComponent } from './leadangeladmin.component';

const routes: Routes = [{
  path: '', component: LeadangeladminComponent,
  children: [
    { path: '', loadChildren: () => import('./leadangeluserlist/leadangeluserlist.module').then(m => m.LeadangeluserlistModule) },
    { path: 'leadangeluserlist', loadChildren: () => import('./leadangeluserlist/leadangeluserlist.module').then(m => m.LeadangeluserlistModule) },
    { path: 'clientuserlist', loadChildren: () => import('./clientuserlist/clientuserlist.module').then(m => m.ClientuserlistModule) },
    { path: 'manageclientsettings', loadChildren: () => import('./manageclientsettings/manageclientsettings.module').then(m => m.ManageclientsettingsModule) },
    { path: 'crmdatarefresh', loadChildren: () => import('./crmdatarefresh/crmdatarefresh.module').then(m => m.CrmdatarefreshModule) },
    { path: 'impersonatelogin', loadChildren: () => import('./impersonatelogin/impersonatelogin.module').then(m => m.ImpersonateloginModule) },
    { path: 'roleandactionsetting', loadChildren: () => import('./role-and-action-setting/role-and-action-setting.module').then(m => m.RoleAndActionSettingModule) },
    { path: 'feature-menu', loadChildren: () => import('./feature-menu/feature-menu.module').then(m => m.FeatureMenuModule) }
  ]
},
]



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeadangeladminRoutingModule { }
