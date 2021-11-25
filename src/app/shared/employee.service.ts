import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { Department } from './department';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  //create an instance
  formData: Employee = new Employee();
  departments: Department[];
  employees: Employee[];

  constructor(private httpClient: HttpClient) { }


  //GET department for Binding 
  bindCmbDepartment() {
    this.httpClient.get(environment.apiUrl + "/api/TblDepartments")
      .toPromise().then(response =>
        this.departments = response as Department[]
      );
  }

  //INSERT
  insertEmployee(employee: Employee): Observable<any> {
    return this.httpClient.post(environment.apiUrl + "/api/TblEmployees", employee);
  }


  //UPDATE
  updateEmployee(employee: Employee): Observable<any> {
    return this.httpClient.put(environment.apiUrl + "/api/TblEmployees", employee);
  }

  //DELETE
  deleteEmployee(id: number) {
    return this.httpClient.delete(environment.apiUrl + "/api/TblEmployees/" + id);
  }

  //GET all employees
  bindListEmployees() {
    this.httpClient.get(environment.apiUrl + "/api/TblEmployees")
      .toPromise().then(response =>
        this.employees = response as Employee[]
      );
  }

  //GET a particular employee
  getEmployee(empId: number): Observable<any> {
    return this.httpClient.get(environment.apiUrl + "/api/TblEmployees/" + empId);
  }

}
