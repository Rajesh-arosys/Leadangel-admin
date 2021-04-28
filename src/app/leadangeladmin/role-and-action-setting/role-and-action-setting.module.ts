import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleAndActionSettingRoutingModule } from './role-and-action-setting-routing.module';
import { RoleAndActionSettingComponent } from './role-and-action-setting.component';
import { MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatPaginatorModule, MatSortModule, MatTableModule, MatToolbarModule } from '@angular/material';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { SelectDropDownModule } from 'ngx-select-dropdown'
import { MatSlideToggleModule} from '@angular/material/slide-toggle';
import { DataTableFilterModule } from 'src/app/common/data-table/filter/data-table-filter.module';
import { DataTableModule } from 'src/app/common/data-table/table/data-table.module';
import { DownloadCsvModule } from 'src/app/common/download-csv/download-csv.module';
import { AdminDialogModule } from 'src/app/common/admindailog/admindailog.module';
import { RoleandactionService } from './roleandaction.service';
// import { DownloadCsvComponent } from 'src/app/common/download-csv/download-csv.component';
// import { DataTableFilterComponent } from 'src/app/common/data-table/filter/data-table-filter.component';
// import { DataTableComponent } from 'src/app/common/data-table/table/data-table.component';
// import { DataTableFilterComponent } from 'src/app/common/data-table/filter/data-table-filter.component';
// import { DataTableComponent } from 'src/app/common/data-table/table/data-table.component';


@NgModule({
  // declarations: [RoleAndActionSettingComponent,DataTableComponent,DataTableFilterComponent],
  declarations: [RoleAndActionSettingComponent, 
    //  DataTableComponent,
    // DataTableFilterComponent,
    // DownloadCsvComponent
  ],
  imports: [
    CommonModule,
    RoleAndActionSettingRoutingModule,
    MatToolbarModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    // SelectDropDownModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule ,
    MatMenuModule,
    DataTableFilterModule,
    DataTableModule,
    DownloadCsvModule,
    AdminDialogModule
    

  ],
  providers:[RoleandactionService],
})
export class RoleAndActionSettingModule { }
