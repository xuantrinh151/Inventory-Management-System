import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../Product';
import { ProductService } from '../services/product.service';
import { SharedServiceService } from '../services/shared-service.service';
import {CategoryService} from "../services/category.service";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  product: Product = new Product();

  successMessage:string ="";
  errMessage: string ="";
  categoryList:any;


  constructor(private productService:ProductService,private categoryService:CategoryService, private sharedServiceService:SharedServiceService) {

  }


  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(data => {
      this.categoryList = data;
    });
  }

  addProductForm=new FormGroup({

    productid:new FormControl('',[Validators.required]),
    productname:new FormControl('',[Validators.required]),
    units: new FormControl('',[Validators.required]),
    category: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
  })

  get productid(){
    return this.addProductForm.get('productid');
  }

  get productname(){
    return this.addProductForm.get('productname');
  }

  get units(){
    return this.addProductForm.get('units');
  }

  get category(){
    return this.addProductForm.get('category');
  }

  get description(){
    return this.addProductForm.get('description');
  }

  addProduct(){

    this.product.productId=this.productid?.value;
    this.product.productName=this.productname?.value;
    this.product.units=this.units?.value;
    this.product.productCategory=this.category?.value;
    this.product.productDescription=this.description?.value;

    console.log(this.product);


    if(this.product.productId=="")
    {
      this.errMessage="Product could not be Added to the catalog : Product Id is required";
    }
    else if(this.product.productName=="")
    {
      this.errMessage="Product could not be Added to the catalog : Product Name is required";
    }
    else if(this.product.productCategory=="")
    {
      this.errMessage="Product could not be Added to the catalog : Product Category is required";
    }
    else if(this.product.units==0  || this.product.units==null)
    {
      this.errMessage="Product could not be Added to the catalog : Product Units can not be 0";
    }
    else if(this.product.productDescription=="")
    {
      this.errMessage="Product could not be Added to the catalog : Product Description is required";
    }
    else{

      this.productService.addProduct(this.product).subscribe(data => {

        if(data)
        {
            this.errMessage="";
            this.successMessage="Product successfully added to the catalog";
        }
        else{
          this.successMessage="";
          this.errMessage="Product could not be Added to the catalog : Check Specification of your product";
        }

      })

    }


  }


}
