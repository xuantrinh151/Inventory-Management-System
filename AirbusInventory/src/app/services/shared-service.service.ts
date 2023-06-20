import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

  title:string="";
  content:string="";
  page:string="";

  product:any;
  category:any;

  constructor() { }

  setdialogtitle(title:string){
    this.title=title;
  }

  setdialogcontent(content:string){
    this.content=content;

  }

  setdialogpage(page:string){
    this.page=page;
  }

  getdialogpage(){
    return this.page;
  }

  getdialogtitle(){
    return this.title;
  }
  getdialogcontent(){
    return this.content;

  }

  setProduct(product:any){
      this.product=product;
  }

  getProduct(){
    return this.product;
  }

  setCategory(category:any){
    this.category=category;
  }

  getCategory(){
    return this.category;
  }
}
