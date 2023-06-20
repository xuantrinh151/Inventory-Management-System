import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Category} from "../Category";
import {CategoryService} from "../services/category.service";

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  category: Category = new Category();

  successMessage:string ="";
  errMessage: string ="";

  constructor(private categoryService:CategoryService) {

  }


  ngOnInit(): void {
  }

  addCategoryForm=new FormGroup({

    categoryId:new FormControl('',[Validators.required]),
    categoryName:new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
  })

  get categoryId(){
    return this.addCategoryForm.get('categoryId');
  }

  get categoryName(){
    return this.addCategoryForm.get('categoryName');
  }

  get description(){
    return this.addCategoryForm.get('description');
  }

  addCategory(){

    this.category.categoryId=this.categoryId?.value;
    this.category.categoryName=this.categoryName?.value;
    this.category.description=this.description?.value;

    console.log(this.category);


    if(this.category.categoryId=="")
    {
      this.errMessage="Category could not be Added to the catalog : Category Id is required";
    }
    else if(this.category.categoryName=="")
    {
      this.errMessage="Category could not be Added to the catalog : Category Name is required";
    }
    else if(this.category.description=="")
    {
      this.errMessage="Category could not be Added to the catalog : Category Description is required";
    }
    else{
      this.categoryService.addCategory(this.category).subscribe(data => {

        if(data)
        {
            this.errMessage="";
            this.successMessage="Category successfully added to the catalog";
        }
        else{
          this.successMessage="";
          this.errMessage="Category could not be Added to the catalog : Check Specification of your product";
        }

      })

    }


  }


}
