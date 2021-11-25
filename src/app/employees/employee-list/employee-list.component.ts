import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/shared/employee';
import { EmployeeService } from 'src/app/shared/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  //assign default page
  page: number=1;
  filter: string;

  constructor(public employeeService: EmployeeService, 
    private toastrService: ToastrService,
    private router:Router) { }

  ngOnInit(): void {
    //get all employees thru Service
    this.employeeService.bindListEmployees();
  }

  //populate form by clicking the column fields
  populateForm(emp: Employee) {
    console.log(emp);

    //date format
    var datePipe = new DatePipe("en-UK");
    let formatedDate: any = datePipe.transform(emp.DateOfJoining, 'yyyy-MM-dd');
    emp.DateOfJoining = formatedDate;

    this.employeeService.formData = Object.assign({}, emp);
  }

  //delete employee
  deleteEmployee(id: number) {
    console.log("Deleting a record...");
    if (confirm('Are you sure to DELETE this record?')) {
      this.employeeService.deleteEmployee(id).subscribe(
        (result) => {
          console.log(result);
          this.employeeService.bindListEmployees();
          this.toastrService.success('Employee record has been deleted', 'EmpApp v2021');
          //
        },
        (error) => {
          console.log(error);
        });
    }

  }

  //update an employee
  updateEmployee(empId:number){
    console.log(empId);
    this.router.navigate(['employee',empId]);
  }

  

  /*
  launchEmployee(){
    this.router.navigate(['employee']);
    }*/
}
