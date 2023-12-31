import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Product } from '../Product';
import { ProductService } from '../services/product.service';
import { SharedServiceService } from '../services/shared-service.service';
import { SuccessfulDialogComponent } from '../successful-dialog/successful-dialog.component';
import { UnSuccessfulDialogComponent } from '../un-successful-dialog/un-successful-dialog.component';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  product:Product  = new Product();

  successMessage:string ="";
  errMessage: string ="";

  constructor(private productService: ProductService, private dialog:MatDialog, private sharedServices:SharedServiceService) {
  }

  ngOnInit(): void {

    this.product=this.sharedServices.getProduct();
  }


  updateProductForm=new FormGroup({
    productName:new FormControl('',[Validators.required]),
    units: new FormControl('',[Validators.required]),
    category: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
  })

  get productName(){
    return this.updateProductForm.get('productName');
  }

  get units(){
    return this.updateProductForm.get('units');
  }

  get category(){
    return this.updateProductForm.get('category');
  }

  get description(){
    return this.updateProductForm.get('description');
  }

  updateProduct(){

    this.product.productName=this.productName?.value;
    this.product.units=this.units?.value;
    this.product.productCategory=this.category?.value;
    this.product.productDescription=this.description?.value;



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
    else if(this.product.units==0 || this.product.units==null)
    {
      this.errMessage="Product could not be Added to the catalog : Product Units can not be 0";
    }
    else if(this.product.productDescription=="")
    {
      this.errMessage="Product could not be Added to the catalog : Product Description is required";
    }
    else{
      this.productService.updateProduct(this.product, this.product.productId).subscribe(data => {

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
    this.sharedServices.setdialogpage("product");
    this.sharedServices.setdialogcontent("Product Updated Successfully !!");
    this.dialog.open(SuccessfulDialogComponent);
  }

  openUnSuccessfulDialog() {
    this.sharedServices.setdialogtitle("Unsuccessful");
    this.sharedServices.setdialogpage("product");
    this.sharedServices.setdialogcontent("Product could not be Updated !!");
    this.dialog.open(UnSuccessfulDialogComponent);
  }

}
