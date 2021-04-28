import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
export class menulist{
  menuname:string;
  icon:string;
  link:string
};
@Component({
  selector: 'app-leftnavbar',
  templateUrl: './leftnavbar.component.html',
  styleUrls: ['./leftnavbar.component.scss']
})
export class LeftnavbarComponent implements OnInit {
public sidemenu:menulist[]=[
  {menuname:'LeadAngel User List',icon:'person', link:'leadangeluserlist'},
  {menuname:'Client User', icon:'people_alt',link:'clientuserlist'},
  {menuname:'Manage Client Settings', icon:'settings', link:'manageclientsettings'},
  {menuname:'Role And Action Setting ', icon:'build_circle', link:'roleandactionsetting'},
  {menuname:'CRM Data Refresh', icon:'restore_page', link:'crmdatarefresh'},
  {menuname:'Feature Menu list', icon:'dashboard', link:'feature-menu'},
  {menuname:'Impersonate Login', icon:'account_box', link:'impersonatelogin'},
  

]
  constructor(public router:Router) {

   }

  ngOnInit() {
    // console.log(this.sidemenu)
  }
  routerlink(){
    this.router.navigate(['/leadangeladmin/leadangeluserlist'])
  }

}
