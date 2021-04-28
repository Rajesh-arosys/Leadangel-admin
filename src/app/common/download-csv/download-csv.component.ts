import {    Component, OnInit,  Input,Output, SimpleChanges,EventEmitter } from '@angular/core';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv'
import { SharedService } from '../shared.service';


@Component({
  selector: 'app-download-csv',
  templateUrl: './download-csv.component.html',
  styleUrls: ['./download-csv.component.scss'],
  
})
export class DownloadCsvComponent implements OnInit {
  
  @Input() csvData;
  @Input() csvHeader;
  @Input() title;
  @Input() buttonName;
  @Input() fileName;
  @Input() isDownloaded;
  @Input() iconName = 'cloud_download';
  @Input() disableDwnld;
  @Input() loader;


  // csvOptionAllSettings={}
  csvOptionAllSettings = {
    fieldSeparator  : ',',
    quoteStrings    : '"',
    decimalseparator: '.',
    showLabels      : true,
    showTitle       : true,
    title           : '',
    useBom          : true,
    noDownload      : false,
    headers         : []
  };

  public ProgressSpinnermode = 'indeterminate';
  public displayProgressSpinner=true
  
  constructor(private sharedService: SharedService,
  ) { }


  ngOnInit() {
    // console.log('disableDwnld ',this.disableDwnld)
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log("changes",changes)

    // if (changes['tableData']) {this.csvDownload()}
     console.log('disableDwnld ',this.disableDwnld)
    if(this.isDownloaded && this.disableDwnld==false){
      this.csvDownload()
    }
  }
  csvDownload(){
    this.csvOptionAllSettings.title   = this.title
    this.csvOptionAllSettings.headers = this.csvHeader
    new AngularCsv(this.csvData,this.fileName , this.csvOptionAllSettings);
    console.log("download Started");
  }
}
