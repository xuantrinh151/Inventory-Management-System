import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SharedServiceService} from './shared-service.service';
import {Category} from "../Category";
import {Product} from "../Product";


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient, private sharedServiceService:SharedServiceService) { }


  getCategories(): Observable<any> {

    return this.httpClient.get<any>('http://localhost:8080/airbusManagement/getAllCategories',{
      headers:new HttpHeaders(
        {
          'Authorization' : `Bearer ${localStorage.getItem('token')}`
        }
      )
    });
  }

  deleteCategory(categoryId: any): Observable<any> {
    return this.httpClient.delete<any>(`http://localhost:8080/airbusManagement/deleteCategory/${categoryId}`,{
      headers:new HttpHeaders(
        {
          'Authorization' : `Bearer ${localStorage.getItem('token')}`
        }
      )
    });
  }

  addCategory(category:Category): Observable<any>{
    return this.httpClient.post<any>('http://localhost:8080/airbusManagement/addCategory',category,{
      headers:new HttpHeaders(
        {
          'Authorization' : `Bearer ${localStorage.getItem('token')}`
        }
      )
    });
  }

  updateCategory(category:Category,categoryId: any): Observable<any>{
    return this.httpClient.post<any>(`http://localhost:8080/airbusManagement/updateCategory/${categoryId}`,category,{
      headers:new HttpHeaders(
        {
          'Authorization' : `Bearer ${localStorage.getItem('token')}`
        }
      )
    });
  }
}
