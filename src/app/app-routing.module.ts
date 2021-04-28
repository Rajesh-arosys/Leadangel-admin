import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [  
 { path: '', loadChildren: './adminlogin/adminlogin.module#AdminloginModule'},
//  { path: 'client-login', loadChildren: './adminlogin/adminlogin.module#AdminloginModule'},
 { path: 'change-password/:ID', loadChildren: './resetpassword/resetpassword.module#ResetpasswordModule',pathMatch:'full'},
//  { path: '', loadChildren: () => import('./leadangeladmin/leadangeladmin.module').then(m => m.LeadangeladminModule) },
{ path: 'leadangel-login', loadChildren: () => import('./adminlogin/adminlogin.module').then(m => m.AdminloginModule) },
{ path: 'leadangeladmin', loadChildren: () => import('./leadangeladmin/leadangeladmin.module').then(m => m.LeadangeladminModule) },

{path:'**',component: PagenotfoundComponent,pathMatch:'full'},
 
];
@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload'})],
  exports: [RouterModule],
})
export class AppRoutingModule { }
