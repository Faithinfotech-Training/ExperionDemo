import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeeService } from 'src/app/shared/employee.service';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/shared/employee';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  empId: number;
  employee: Employee = new Employee();

  constructor(public empService: EmployeeService,
    private toastrService: ToastrService, private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    //this.resetform();
    //get departments
    this.empService.bindCmbDepartment();


    //get empiD from ActivatedRoute
    this.empId = this.route.snapshot.params['empId'];

    if (this.empId != 0 || this.empId != null){
      //getEmployee
      this.empService.getEmployee(this.empId).subscribe(
        data => {
          console.log(data);

          //date format
          var datePipe = new DatePipe("en-UK");
          let formatedDate: any = datePipe.transform(data.DateOfJoining, 'yyyy-MM-dd');
          data.DateOfJoining = formatedDate;

          this.empService.formData = Object.assign({}, data);

        },
        error =>
          console.log(error)
      );
    }


  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    let addId = this.empService.formData.EmployeeId;

    if (addId == 0 || addId == null) {

      //INSERT 
      this.insertEmployeeRecord(form);
    }
    else {
      //UPDATE
      console.log("Updating record...");
      this.updateEmployeeRecord(form);
    }

  }

  //Clear all contents at Iniatialization
  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
  }

  //INSERT
  insertEmployeeRecord(form?: NgForm) {
    console.log("Inserting a record...");
    this.empService.insertEmployee(form.value).subscribe(
      (result) => {
        console.log(result);
        this.resetForm(form);
        this.toastrService.success('Employee record has been inserted', 'EmpApp v2021');
        window.location.reload();
      }
    );
    //
  }


  //UPDATE
  updateEmployeeRecord(form?: NgForm) {
    console.log("Upading a record...");
    this.empService.updateEmployee(form.value).subscribe(
      (result) => {
        console.log(result);
        this.resetForm(form);
        this.toastrService.success('Employee record has been updated', 'EmpApp v2021');
        //this.empService.bindListEmployees();
      }
    );
    //window.alert("Employee record has been updated");
    //window.location.reload();
  }



}
