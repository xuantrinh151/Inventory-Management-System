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

  constructor(private sharedservice:SharedServiceService,private routerService: RouterService) { }

  ngOnInit(): void {

  this.title=this.sharedservice.getdialogtitle();
  this.content=this.sharedservice.getdialogcontent();
  this.page = this.sharedservice.getdialogpage();
}


  refreshPage(){
    if (this.page === 'product'){
      this.routerService.routeToAllProduct();
    }else  if(this.page === 'category'){
      this.routerService.routeToAllCategory();
    }
  }
}
