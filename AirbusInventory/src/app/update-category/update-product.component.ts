import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {SharedServiceService} from '../services/shared-service.service';
import {SuccessfulDialogComponent} from '../successful-dialog/successful-dialog.component';
import {UnSuccessfulDialogComponent} from '../un-successful-dialog/un-successful-dialog.component';
import {CategoryService} from "../services/category.service";
import {Category} from "../Category";

@Component({
  selector: 'app-update-product',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {

  category:Category  = new Category();

  successMessage:string ="";
  errMessage: string ="";

  constructor(private categoryService: CategoryService, private dialog:MatDialog, private sharedServices:SharedServiceService) {
  }

  ngOnInit(): void {

    this.category=this.sharedServices.getCategory();
  }


  updateCategoryForm=new FormGroup({
    categoryName:new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
  })

  get categoryName(){
    return this.updateCategoryForm.get('categoryName');
  }

  get description(){
    return this.updateCategoryForm.get('description');
  }

  updateCategory(){

    this.category.categoryName=this.categoryName?.value;
    this.category.description=this.description?.value;



   if(this.category.categoryName=="")
    {
      this.errMessage="Category could not be Added to the catalog : Category Name is required";
    }
    else if(this.category.description=="")
    {
      this.errMessage="Category could not be Added to the catalog : Category Description is required";
    }
    else{
      this.categoryService.updateCategory(this.category, this.category.categoryId).subscribe(data => {

        if(data)
        {
          this.openSuccessfulDialog();
        }
        else{
          this.openUnSuccessfulDialog();
        }

      });

    }

  }

  openSuccessfulDialog() {
    this.sharedServices.setdialogtitle("Successful");
    this.sharedServices.setdialogpage("category");
    this.sharedServices.setdialogcontent("Category Updated Successfully !!");
    this.dialog.open(SuccessfulDialogComponent);
  }

  openUnSuccessfulDialog() {
    this.sharedServices.setdialogtitle("Unsuccessful");
    this.sharedServices.setdialogpage("category");
    this.sharedServices.setdialogcontent("Category could not be Updated !!");
    this.dialog.open(UnSuccessfulDialogComponent);
  }

}
