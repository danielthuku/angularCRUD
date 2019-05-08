import { Component, OnInit } from '@angular/core';

import { EmployeeService } from '../shared/employee.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private employeeService : EmployeeService, private toastr : ToastrService ) { }

  ngOnInit() {
  this.resetForm();
  }


  resetForm(form? : NgForm){ 
    if (form != null)
       form.reset();

    this.employeeService.selectedEmployee = {
      EmployeeID : null,
      FirstName : '',
      LastName : '',
      EmpCode : '',
      Position : '',
      Office : ''

    }
  }


  onSubmit(form : NgForm){
    //Post -- insert
    if (form.value.EmployeeID == null){

        this.employeeService.postEmployee(form.value)
        .subscribe( data => { 
          this.toastr.success('New Record Added Successfully','Employee Register');
          this.resetForm(form);
          this.employeeService.getEmployeeList()
          console.log(this.toastr);
        })
  
    }else{ //Update

      this.employeeService.putEmployee(form.value.EmployeeID, form.value)
      .subscribe( data => { 
        this.toastr.success('Record Updated  Successfully','Employee Update');
        this.resetForm(form);
        this.employeeService.getEmployeeList()
        console.log(this.toastr);
      })
  }

  }



  deleteEmployees(id : number){
    //Delete
    if (id != null){

        this.employeeService.deleteEmployee(id)
        .subscribe( data => { 
          this.toastr.success('Revord Deleted Successfully','Employee Register');
          this.employeeService.getEmployeeList()
          console.log(this.toastr);
        })
  
  }
}







}
