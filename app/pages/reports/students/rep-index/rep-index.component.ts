import { StudentService } from './../../../Reg/student/student.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatDialog } from '@angular/material';

@Component({
  selector: 'app-rep-index',
  templateUrl: './rep-index.component.html',
  styleUrls: ['./rep-index.component.scss']
})
export class RepIndexComponent implements OnInit {
 
  
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

  constructor(private service: StudentService)
  { }

  ngOnInit() {
    this.getStudentList();
  }


  
  getStudentList(){
    return this.service.getStudentList().subscribe(res=>this.dataSource=res);
  }

}
