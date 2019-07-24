import { Student } from 'src/app/Models/Reg/Students/students';
import { StudentService } from './../student.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatDialog } from '@angular/material';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-student-index',
  templateUrl: './student-index.component.html',
  styleUrls: ['./student-index.component.scss']
})
export class StudentIndexComponent implements OnInit {

  dataSource:any;
  loading=false;
  cols=[
    //{field:"index", header:"index"},
    {field:"id", header:"#"},
   // {field:"studNo", header:"رقم الطالب"},
    //{field:"firstName", header:"إسم الطالب"},
   // {field:"parentId", header:"ولي الامر"},
    {field:"studFullName", header:"إسم الطالب"}
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public displayedColumns: string[] = this.cols.map(col => col.field).concat('actions');
  
  constructor(private service:StudentService,
    private dialog: MatDialog) { }

  ngOnInit() {
 this.getStudentList();
  }

  getStudentList(){
    return this.service.getStudentList().subscribe(res=>this.dataSource=res);
  }


//Delete
deleteStudent(parent: Student) {
  this.loading = true;
  this.service.deleteStudnt(parent.id).subscribe(
    res => this.handleSuccess(),
    err => {this.handleErrors(),this.loading = false},
    () => this.loading = false
  );
}


openDeleteDialog(model: Student) {
  const dialogRef = this.dialog.open(DeleteDialogComponent, {
    data: {
      name: `${model.firstName}`
    }
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result === true) {
      this.deleteStudent(model);
    }
  });
}
private handleSuccess() {
  this.getStudentList();
}

private handleErrors() {
}


}
