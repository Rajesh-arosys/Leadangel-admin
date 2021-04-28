import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeadangeluserlistRoutingModule } from './leadangeluserlist-routing.module';
import { LeadangeluserlistComponent } from './leadangeluserlist.component';
import { MatButtonModule, MatIconModule, MatPaginatorModule, MatSortModule, MatTableModule, MatToolbarModule } from '@angular/material';

import {MatMenuModule} from '@angular/material/menu';
import { AdminDialogModule } from 'src/app/common/admindailog/admindailog.module';
import { LeadangeluserlistService } from './leadangeluserlist.service';
import { RouterModule, Routes } from '@angular/router';
import { DataTableModule } from 'src/app/common/data-table/table/data-table.module';
import { DataTableFilterModule } from 'src/app/common/data-table/filter/data-table-filter.module';
import { ProgressSpinnerModule } from 'src/app/progress-spinner/progress-spinner.module';
import { CustomNotificationModule } from 'src/app/common/custom-notification/custom-notification.module';

@NgModule({
  declarations: [LeadangeluserlistComponent],
  imports: [
    CommonModule,
    DataTableFilterModule,
    ProgressSpinnerModule,
    LeadangeluserlistRoutingModule,
    MatToolbarModule,
    DataTableModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    CustomNotificationModule,
    MatSortModule,
    MatMenuModule,
    AdminDialogModule  
  ],
  providers:[LeadangeluserlistService],
  exports: [LeadangeluserlistComponent]
})
export class LeadangeluserlistModule { }
