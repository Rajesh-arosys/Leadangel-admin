import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientuserlistRoutingModule } from './clientuserlist-routing.module';
import { ClientuserlistComponent } from './clientuserlist.component';
import { Routes, RouterModule } from '@angular/router';
import { MatToolbarModule, MatTableModule, MatButtonModule, MatIconModule, MatPaginatorModule, MatSortModule, MatMenuModule } from '@angular/material';
import { AdminDialogModule } from 'src/app/common/admindailog/admindailog.module';
// import { SelectDropDownModule } from 'ngx-select-dropdown';
import { ProgressSpinnerModule } from 'src/app/progress-spinner/progress-spinner.module';
import { DataTableFilterModule } from 'src/app/common/data-table/filter/data-table-filter.module';
import { DataTableModule } from 'src/app/common/data-table/table/data-table.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { CustomNotificationModule } from 'src/app/common/custom-notification/custom-notification.module';
import { ClientUserListService } from './clientuserlist.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ClientuserlistComponent],
  imports: [
   
    CommonModule,
    CustomNotificationModule,
    ClientuserlistRoutingModule,
    ProgressSpinnerModule,
    NgSelectModule,
    DataTableFilterModule,
    DataTableModule,
    MatToolbarModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule,
    AdminDialogModule  ,
    FormsModule
    // SelectDropDownModule
  ],
  exports:[ClientuserlistComponent,
    MatToolbarModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule,
    AdminDialogModule  ],
    providers:[ClientUserListService],
})
export class ClientuserlistModule { }
