import { Component, OnInit, ChangeDetectionStrategy, HostListener, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: 'app-common-dialog',
  templateUrl: './common-dialog.component.html',
  styleUrls: ['./common-dialog.component.scss']
})
export class CommonDialogComponent implements OnInit {

  public menuName: string
  public menuDesc: string
  public dialogDefinedData: any
  public moveparentid : number
  public maxNameLength=50
  public maxDescriptionLength=150
  public inputError=false
  public descError=false
  public disableSave=false
  public inputLength=0
  public descLength=0


  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    cancelText: string,
    confirmText: string,
    message: string,
    title: string,
    dialogtype: string,
    parentdata : any,
    description:{menuID:number,subMenuDesc:string,parentID:number,ObjectTypeId:number}
  }, private mdDialogRef: MatDialogRef<CommonDialogComponent>) {

   }

  ngOnInit() {
    console.log('data ',this.data)
    if (this.data.dialogtype == 'Edit_menu_description') {
      this.menuDesc=this.data.description.subMenuDesc
      this.descLength=this.data.description.subMenuDesc.length
      // this.disableSave=this.data.description.subMenuDesc.length>150?true:false
      // this.descError=this.data.description.subMenuDesc.length>150?true:false
    }
    else if (this.data.dialogtype == 'RENAME') {
      this.menuName=this.data.title
      this.inputLength=this.data.title.length
      // this.disableSave=this.menuName.length>50?true:false
      // this.inputError=this.menuName.length>50?true:false
      
    }
    else if (this.data.dialogtype == 'NEW_OBJECT' || this.data.dialogtype=="NEW_FOLDER") {
      this.menuName=''
    // console.log('menuName ',this.menuName+' '+this.menuName.length)

      this.inputLength=0
      this.descLength=0
      this.disableSave=(this.menuName.trim().length==0)?true:false
      // this.inputError=false
      // this.descError=false
      
    }


  }

  public cancel() {
    this.close(false);
  }
  public close(value) {

    if (this.data.dialogtype == 'NEW_FOLDER' || this.data.dialogtype == 'NEW_OBJECT') {
      this.maxDescriptionLength=150
      // console.log('this.menuName',this.menuName)
      this.dialogDefinedData = {
        "menuname": !this.menuName?'':this.menuName.trim(),
        "menudesc": !this.menuDesc?'':this.menuDesc,
        "value": value
      }
      this.mdDialogRef.close(this.dialogDefinedData);
    }
    
    if (this.data.dialogtype == 'DELETE') {
      this.dialogDefinedData = {
        "value": value
      }
      this.mdDialogRef.close(this.dialogDefinedData);
    }
    if (this.data.dialogtype == 'RENAME') {
      this.dialogDefinedData = {
        "value": value,
        "menuname": this.menuName.trim()
      }
      this.mdDialogRef.close(this.dialogDefinedData);
    }
    if (this.data.dialogtype == 'APPROVED') {
      this.dialogDefinedData = {
        "value": value,
      }
      this.mdDialogRef.close(this.dialogDefinedData);
    }
    if (this.data.dialogtype == 'CLONE') {
      this.dialogDefinedData = {
        "value": value,
      }
      this.mdDialogRef.close(this.dialogDefinedData);
    }
    if (this.data.dialogtype == 'MOVE') {
      this.dialogDefinedData = {
        "moveparentid": this.moveparentid,
        "value": value,
      }
      this.mdDialogRef.close(this.dialogDefinedData);
    }
    if (this.data.dialogtype == 'Edit_menu_description') {
      this.data.description.subMenuDesc=this.menuDesc
      this.dialogDefinedData = {
        "submenuid" : this.data.description.menuID,
        "menudesc" : this.menuDesc, 
       "operationtype" : "EDITDESC"
      }
      
    }
    if(this.data.dialogtype=='DEACTIVATE'){
      this.dialogDefinedData = {
        "value": value
      }
      this.mdDialogRef.close(this.dialogDefinedData)
      
    }
   
  }
 
  public confirm() {
    this.close(true);
  }
  @HostListener("keydown.esc")
  public onEsc() {
    this.close(false);
  }

  countName(inputFrom){
    if(inputFrom=='RENAME_INP'){
      this.inputLength=this.menuName.length
      this.disableSave=(this.menuName.trim().length==0)?true:false
      this.inputError=this.menuName.length>50?true:false
    }else if(inputFrom=='NEW_OBJ_INP'){
      this.inputLength=this.menuName.length
      // this.disableSave=((this.menuDesc!=undefined?this.menuDesc.length:0)>100 || this.menuName.length>50)?true:false
      this.disableSave=(this.menuName.trim().length==0)?true:false
      this.inputError=this.menuName.length>50?true:false
    }

  }
  countDesc(descFrom){
    if(descFrom=='NEW_OBJ_TXT'){
      this.descLength=this.menuDesc.length
      // this.disableSave=((this.menuName!=undefined?this.menuName.length:0)>50 || this.menuDesc.length>100)?true:false
      // this.descError=this.menuDesc.length>100?true:false
    }
    else if(descFrom=='Edit_menu_description'){
      // this.menuDesc=this.data.description.subMenuDesc
      this.descLength=this.menuDesc.length
      // this.disableSave=this.menuDesc.length>150?true:false
      // this.descError=this.menuDesc.length>150?true:false
    }
  }
  
}
