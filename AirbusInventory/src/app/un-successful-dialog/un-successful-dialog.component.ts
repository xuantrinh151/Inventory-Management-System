import { Component, OnInit } from '@angular/core';
import { RouterService } from '../services/router.service';
import { SharedServiceService } from '../services/shared-service.service';

@Component({
  selector: 'app-un-successful-dialog',
  templateUrl: './un-successful-dialog.component.html',
  styleUrls: ['./un-successful-dialog.component.css']
})
export class UnSuccessfulDialogComponent implements OnInit {


  title:string="";
  content:string="";
  constructor(private sharedService:SharedServiceService,private routerService: RouterService) { }

  ngOnInit(): void {

  this.title=this.sharedService.getdialogtitle();
  this.content=this.sharedService.getdialogcontent();
}

  refreshPage(){
    this.routerService.routeToAllProduct();
  }

}
