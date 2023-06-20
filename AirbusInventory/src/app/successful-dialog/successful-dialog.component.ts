import { Component, OnInit } from '@angular/core';
import { RouterService } from '../services/router.service';
import { SharedServiceService } from '../services/shared-service.service';

@Component({
  selector: 'app-successful-dialog',
  templateUrl: './successful-dialog.component.html',
  styleUrls: ['./successful-dialog.component.css']
})
export class SuccessfulDialogComponent implements OnInit {

  title:string="";
  content:string="";
  page: string="";

  constructor(private sharedService:SharedServiceService,private routerService: RouterService) { }

  ngOnInit(): void {

  this.title=this.sharedService.getdialogtitle();
  this.content=this.sharedService.getdialogcontent();
  this.page = this.sharedService.getdialogpage();
}


  refreshPage(){
    if (this.page === 'product'){
      this.routerService.routeToAllProduct();
    }else  if(this.page === 'category'){
      this.routerService.routeToAllCategory();
    }
  }
}
