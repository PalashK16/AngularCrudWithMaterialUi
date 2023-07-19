import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http:HttpClient) { }
  url="http://localhost:8080/api/employees/";

  saveEmployee(data:any){
    return this.http.post<any>(this.url,data);
  }

  getEmployees(){
    return this.http.get<any>(this.url);
  }

  putEmployee(data:any,id:number){
    return this.http.put<any>(this.url+id,data);
  }

  deleteEmployee(id:number){
    return this.http.delete<any>(this.url+id);
  }
}
