import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders,  HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
//import 'rxjs/add/operator/map';
//import './rxjs-operators';
//import 'rxjs/add/operator/toPromise';

import {Employee} from './employee.model'

@Injectable(
  { providedIn: 'root'}
)

export class EmployeeService {

  public selectedEmployee : Employee;
  public employeeList : Employee[]; //list employees

  constructor(private http : HttpClient) { }
  

  //////////////////////Post //////////////////////
  postEmployee( emp : Employee){
   
    var body = JSON.stringify(emp);
    var headerOptions = { headers: new HttpHeaders({'Content-Type':  'application/json','Authorization': 'my-auth-token', observe : 'response' })};
    return this.http.post('http://danemployeeapp.azurewebsites.net/api/Employee', body ,headerOptions)  
    
  }; 
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&


  //////////////////////Update //////////////////////
  putEmployee( id, emp){
   
    var body = JSON.stringify(emp);
    var headerOptions = { headers: new HttpHeaders({ 'Content-Type':  'application/json','Authorization': 'my-auth-token', observe : 'response' })};
    return this.http.put('http://danemployeeapp.azurewebsites.net/api/Employee/' + id, body ,headerOptions)  
    
  }; 
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&



  //////////////////////Delete //////////////////////
  deleteEmployee(id : number){
   
    //var body = JSON.stringify(emp);
    var headerOptions = { headers: new HttpHeaders({ 'Content-Type':  'application/json','Authorization': 'my-auth-token', observe : 'response' })};
    return this.http.delete('http://danemployeeapp.azurewebsites.net/api/Employee/' + id, headerOptions)  
    
  }; 
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&




//////////////////////GEt //////////////////////
configUrl  = 'http://danemployeeapp.azurewebsites.net/api/Employee'

getConfig() {
  return this.http.get<Employee[]>(this.configUrl);
}

getEmployeeList(): Observable<Employee[]> {
  this.getConfig()
    .subscribe((data: Employee[]) =>  {
      this.employeeList = data;
      return this.employeeList;
    })
    return null;
}
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
  
}
