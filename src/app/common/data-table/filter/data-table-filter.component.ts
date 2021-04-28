import {Component, OnInit,  Input,Output, SimpleChanges,EventEmitter} from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-data-table-filter',
  templateUrl: './data-table-filter.component.html',
  styleUrls: ['./data-table-filter.component.scss']
})
export class DataTableFilterComponent implements OnInit {

  @Input() tableData=[];
  @Input() completed;
  @Output() filteredData:EventEmitter<any> = new EventEmitter()

  public dataSource
  public completeData
  public keyword=''
  constructor() { }

  ngOnInit() {
  }

  clearFilterSearch(){
    this.keyword= ''
    this.applyFilter(this.keyword)
  }

  ngOnChanges(changes: SimpleChanges) {
    this.keyword = ''
    // only run when property "tableData" changed
    if (changes['tableData']) {
        this.dataSource = JSON.parse(JSON.stringify(this.tableData))
    }
    if (this.completed) {
      this.completeData = JSON.parse(JSON.stringify(this.tableData))
      this.dataSource = JSON.parse(JSON.stringify(this.tableData))
      this.removeColumns()
      this.applyFilter(this.keyword)
    }
    this.completed=false
  }

  applyFilter(filterValue: string) {
    // console.log('filterValue ',filterValue)
    this.removeColumns()
    this.keyword=filterValue
    this.dataSource = new MatTableDataSource(this.completeData);
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.filteredData.emit(this.dataSource.filteredData)
    console.log('filteredData ',this.dataSource.filteredData)
  }
  removeColumns(){
    // removing unnecessary columns from this.completeData   ->User and access
    if(this.tableData[0].popupFrom=='UserAndAccessComponent'){
      this.completeData.forEach(v => {
        delete v.BlockTypeId
        delete v.ResetPasswordDate
        delete v.updatedOn
        delete v.updatedBy
        delete v.createdOn
        delete v.createdBy
        delete v.resetPasswordLinkStatus
        delete v.token
        delete v.passwordResetLink
        delete v.password
        delete v.rowNumber
        delete v.clientUserId
        delete v.clientPartnerID
        delete v.clientId
        delete v.SNo
        delete v.popupFrom
        delete v.Actions
        delete v.actionIcon
      });
    }
    // removing unnecessary columns from this.completeData  ->netNewAccReport
    else if(this.tableData[0].popupFrom=='netNewAccReport'){
      this.completeData.forEach(v => {
        delete v.popupFrom
      });
    }
    // removing unnecessary columns from this.completeData  ->overview
    else if(this.tableData[0].popupFrom=='overview'){
      this.completeData.forEach(v => {
          delete v.ApprovedDate                
          delete v.CreatedBy                   
          delete v.CreatedDate                 
          delete v.IsActive                    
          delete v.IsAppliedCSS                
          delete v.IsApproved                  
          delete v.IsChildPresent              
          delete v.IsFolder                    
          delete v.IsMarketCondition           
          delete v.IsObjectEdited              
          delete v.IsVisible                   
          delete v.LastSyncUpdateDateTime      
          delete v.LeadRouterStatus            
          delete v.MappedColumnToContact       
          delete v.MarketSegmentType           
          delete v.MenuCondition               
          delete v.MenuDesc                    
          delete v.ObjectTypeId                
          delete v.ParentId                    
          delete v.RoundRobinLastAssignedUserID
          delete v.StaticListId                
          delete v.StaticListName              
          delete v.SubMenuId                   
          delete v.SyncLeadSegmentToMarketo  
          delete v.popupFrom
      });
    }
    // removing unnecessary columns from this.completeData  ->srAccountMapping
    else if(this.tableData[0].popupFrom=='srAccMapping'){
      this.completeData.forEach(v => {
        delete v.SNo
        delete v.popupFrom
        delete v.Actions
        delete v.actionIcon 
        // delete v.AccountSalesRepId 
        delete v.LastAssignedOwner 
        delete v.NetNewAccountName 
      });
    }
    // removing unnecessary columns from this.completeData  ->mngclientsetting
    else if(this.tableData[0].popupFrom=='mngClSettings'){
      this.completeData.forEach(v => {
        delete v.SNo
        delete v.popupFrom
        delete v.Actions
        delete v.actionIcon 
        // delete v.iconColor  
        delete v.rowNumber 

        
      });
    }

    // removing unnecessary columns from this.completeData  ->mngclientsetting
    else if(this.tableData[0].popupFrom=='LeadangeluserlistComponent'){
      this.completeData.forEach(v => {
        delete v.SNo
        delete v.popupFrom
        delete v.Actions
        delete v.actionIcon 
        delete v.iconColor  
        delete v.IsDelete
        delete v.IsReset
        delete v.IsEdit
        delete v.ResetPasswordDate
        delete v.updatedOn
        delete v.updatedBy
        delete v.token
        delete v.passwordResetLink
        delete v.password
        delete v.rowNumber
      });
    }
    else if(this.tableData[0].popupFrom=='ClientuserlistComponent'){
      this.completeData.forEach(v => {
        delete v.Actions
        delete v.actionIcon
        delete v.popupFrom
        delete v.SNo
        delete v.iconColor
        delete v.IsDelete
        delete v.IsReset
        delete v.IsEdit
        delete v.ResetPasswordDate
        delete v.updatedOn
        delete v.updatedBy
        delete v.createdOn
        delete v.createdBy
        delete v.resetPasswordLinkStatus
        delete v.token
        delete v.passwordResetLink
        delete v.password
        delete v.clientUserId
        delete v.rowNumber
        delete v.clientId
        delete v.clientPartnerID
        delete v.vyakarAdminId
      });
    }
    else if(this.tableData[0].popupFrom=='CrmdatarefreshComponent'){
      this.completeData.forEach(columnHeader => {
        delete columnHeader.actionIcon
        delete columnHeader.popupFrom
        delete columnHeader.iconColor
        delete columnHeader.ModifiedBy
        delete columnHeader.CreatedBy
        // delete columnHeader.MaintenanceId
        delete columnHeader.Modifiedts
        // delete columnHeader.SNo
        // delete columnHeader.Actions  
      });
    }
  }

}
