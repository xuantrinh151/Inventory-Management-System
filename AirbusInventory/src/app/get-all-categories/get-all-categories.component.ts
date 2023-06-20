import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {CategoryService} from '../services/category.service';
import {RouterService} from '../services/router.service';
import {SharedServiceService} from '../services/shared-service.service';
import {SuccessfulDialogComponent} from '../successful-dialog/successful-dialog.component';
import {UnSuccessfulDialogComponent} from '../un-successful-dialog/un-successful-dialog.component';
import {Category} from "../Category";

@Component({
  selector: 'app-get-all-categories',
  templateUrl: './get-all-categories.component.html',
  styleUrls: ['./get-all-categories.component.css']
})
export class GetAllCategoriesComponent implements OnInit {

 categoryList:any;

  constructor(private categoryService: CategoryService,public dialog: MatDialog, private sharedServices: SharedServiceService, private routerService:RouterService) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(data => {
      this.categoryList = data;

    });
  }

  deleteCategory(categoryId: string){

    this.categoryService.deleteCategory(categoryId).subscribe(data => {

      if(data)
      {
        this.openSuccessfulDialog();
        this.ngOnInit();
      }
      else{
        this.openUnSuccessfulDialog();
        this.ngOnInit();
      }

    });
  }

  updateCategory(category: Category){

    this.sharedServices.setCategory(category);
    this.routerService.routeToUpdateCategory();
  }


  openSuccessfulDialog() {
    this.sharedServices.setdialogtitle("Successful");
    this.sharedServices.setdialogpage("category");
    this.sharedServices.setdialogcontent("Category Deleted Successfully !!");
    this.dialog.open(SuccessfulDialogComponent);
  }

  openUnSuccessfulDialog() {
    this.sharedServices.setdialogtitle("Unsuccessful");
    this.sharedServices.setdialogpage("category");
    this.sharedServices.setdialogcontent("Category could not be Deleted !!");
    this.dialog.open(UnSuccessfulDialogComponent);
  }

  key: string ='id';
  reverse: boolean=false;
  sort(key:string)
  {
    this.key=key;
    this.reverse=!this.reverse;
  }

}
