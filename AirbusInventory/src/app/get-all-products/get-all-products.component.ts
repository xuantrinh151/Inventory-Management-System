import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Product} from '../Product';
import {ProductService} from '../services/product.service';
import {RouterService} from '../services/router.service';
import {SharedServiceService} from '../services/shared-service.service';
import {SuccessfulDialogComponent} from '../successful-dialog/successful-dialog.component';
import {UnSuccessfulDialogComponent} from '../un-successful-dialog/un-successful-dialog.component';

@Component({
  selector: 'app-get-all-products',
  templateUrl: './get-all-products.component.html',
  styleUrls: ['./get-all-products.component.css']
})
export class GetAllProductsComponent implements OnInit {

 productList:any;
 product:any;

  constructor(private productService: ProductService,public dialog: MatDialog, private sharedServices: SharedServiceService, private routerService:RouterService) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(data => {
      this.productList = data;

    });
  }

  deleteProduct(productId: string){

    this.productService.deleteProduct(productId).subscribe(data => {


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

  updateProduct(product: Product){

    this.sharedServices.setProduct(product);
    this.routerService.routeToUpdateProduct();
  }


  openSuccessfulDialog() {
    this.sharedServices.setdialogtitle("Successful");
    this.sharedServices.setdialogcontent("Product Deleted Successfully !!");
    this.sharedServices.setdialogpage("product");
    this.dialog.open(SuccessfulDialogComponent);
  }

  openUnSuccessfulDialog() {
    this.sharedServices.setdialogtitle("Unsuccessful");
    this.sharedServices.setdialogpage("product");
    this.sharedServices.setdialogcontent("Product could not be Deleted !!");
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
