import { LkpSchool } from './../../../../Models/addLookups/schools/lkpSchool';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { SchoolService } from './../school.service';
import { Component, OnInit } from '@angular/core';
//import { LkpSchool } from 'src/app/Models/addLookups/schools/lkpSchool';
import { ViewChild } from '@angular/core';
import { CommonModule } from "@angular/common";
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';


@Component({
  selector: 'app-school-index',
  templateUrl: './school-index.component.html',
  styleUrls: ['./school-index.component.scss']
})
export class SchoolIndexComponent implements OnInit {

 public dataSource: MatTableDataSource<LkpSchool>;//=new MatTableDataSource<LkpSchool>();
 loading=false;
 view =false;
 //filter: Search<StoresFilter> = new Search<StoresFilter>(10);
 
cols=[
  {field:"id", header:"#"},
  {field:"aname", header:"الاسم بالعربية"},
  //{field:"lname", header:"الاسم بالانجليزية"},
  {field:"city", header:"المدينة"},
  
  {field:"arDescription", header:"الوصف"},
 // {field:"imageFile", header:"LOGO",type:"image"},
  //{field:"mobile",header:"الموبايل"},
 // {field:"fax",header:"فاكس"},
  //{field:"address", header:"العنون"},
 // {field:"webPage", header:"الصفحة الالكترونية"},
 // {field:"faceBook", header:"الوصف"},
 
];
 @ViewChild(MatPaginator) paginator: MatPaginator;
public displayedColumns: string[] = this.cols.map(col => col.field).concat('actions');

cityList: any;
  constructor(private service: SchoolService,
    private dialog: MatDialog) {
this.dataSource=new MatTableDataSource<LkpSchool>();

   }

getSchools(){
  this.service.schoolList().subscribe(
    result=>{console.log(result), 
      this.dataSource.data=result},
    error=>{console.log("error")},
    ()=>console.log("Comlited"),
  )
}

openDeleteDialog(school: LkpSchool) {
  const dialogRef = this.dialog.open(DeleteDialogComponent, {
    data: {
      name: `${school.aname}`
    }
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result === true) {
      this.deleteSchool(school);
    }
  });
}

getCity(){
  this.service.cityList().subscribe(
    get=>this.cityList=get,
    err=>console.log("get city list error"),
    ()=>console.log("comlite")
  )

}


deleteSchool(school: LkpSchool) {
  this.loading = true;
  this.service.deleteSchool(school.id).subscribe(
    res => this.handleSuccess(),
    err => {this.handleErrors(),this.loading = false},
    () => this.loading = false
  );
}


private handleSuccess() {
  this.getSchools();
}

private handleErrors() {
}
  ngOnInit() {
    this.getSchools();
  }

}
