import { Component, OnInit,ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiServiceService } from './service/api-service.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AngularCrudWithMaterialUi';
  displayedColumns: string[] = [ 'id','name', 'department', 'email','phone', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog:MatDialog, private apiService:ApiServiceService){
    
  }

  ngOnInit(): void {
    this.getEmployeeRecord();
  }
  openDialog() {
    this.dialog.open(DialogComponent, {
      width:'30%'
    }).afterClosed().subscribe(resp=>{
      if(resp==='save'){
        this.getEmployeeRecord();
      }
    })
  }

  editRowData(row:any){
    this.dialog.open(DialogComponent,{
      width:'30%',
      data:row
    }).afterClosed().subscribe(resp=>{
      if(resp==='update'){
        this.getEmployeeRecord();
      }
    })
  }

  deleteData(id:number){
    // alert("delete");
    this.apiService.deleteEmployee(id).subscribe({
      next:()=>{
        // alert("Employee Delete Successfully");
        this.getEmployeeRecord();
      },
      error:()=>{
        console.log("something went wrong");
      }
    })
  }

  getEmployeeRecord(){
    this.apiService.getEmployees()
    .subscribe({
      next:(resp)=>{
        console.log(resp);
        this.dataSource = new MatTableDataSource(resp);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(err)=>{
        alert("Error while Fetching the Record"+err);
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
