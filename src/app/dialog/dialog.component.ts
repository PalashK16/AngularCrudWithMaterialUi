import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { Component,Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validator, Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { ApiServiceService } from '../service/api-service.service';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
  
})
export class DialogComponent implements OnInit{

  employeeForm !: FormGroup;
  constructor(private formBuilder:FormBuilder,
     private apiService:ApiServiceService,
     @Inject(MAT_DIALOG_DATA) public editData : any,
     private dialogRef: MatDialogRef<DialogComponent>){}

  ngOnInit(): void {
    
    this.employeeForm = this.formBuilder.group({
      name : ['',Validators.required],
      department: ['',Validators.required],
      email : ['',Validators.required],
      phone:['',Validators.required]
    });

    if(this.editData){
      // this.employeeForm.controls['id'].setValue(this.editData.id);
      this.employeeForm.controls['name'].setValue(this.editData.name);
      this.employeeForm.controls['department'].setValue(this.editData.department);
      this.employeeForm.controls['email'].setValue(this.editData.email);
      this.employeeForm.controls['phone'].setValue(this.editData.phone);
    }
  }

  saveEmployee(){
    console.log(this.employeeForm.value);
    if(!this.editData){
      if(this.employeeForm.valid){
        this.apiService.saveEmployee(this.employeeForm.value)
        .subscribe({
          next:(resp)=>{
            alert("Data Save Successfully"+resp);
            this.employeeForm.reset();
            this.dialogRef.close('save');
          },
          error:(err)=>{
            alert("Something went wrong"+err);
          }
        });
      }
    }else{
      this.updateData();
    }

  }

  updateData(){
      this.apiService.putEmployee(this.employeeForm.value,this.editData.id)
      .subscribe({
        next:(resp)=>{
          alert("Employee Update Successfully "+resp);
          this.employeeForm.reset();
          this.dialogRef.close('update');
        },
        error:(err)=>{
          alert("Something went wrong "+err);
        }
      })
  }


}
