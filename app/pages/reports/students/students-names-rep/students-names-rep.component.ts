import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ReportsService } from '../../reports.service';
import { StudentService } from 'src/app/pages/Reg/student/student.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Student } from 'src/app/Models/Reg/Students/students';

@Component({
  selector: 'students-names-rep',
  templateUrl: './students-names-rep.component.html',
  styleUrls: ['./students-names-rep.component.scss']
})
export class StudentsNamesRepComponent implements OnInit {

  dataSource: any;

  loading=false;
  cols=[
    {field:"id", header:"#"},
    {field:"firstName", header:"إسم الطالب"}
  ];
  @Input() classId: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public displayedColumns: string[] = this.cols.map(col => col.field);
  

  constructor(private reportsService: ReportsService,
    private studentService: StudentService) { 


    }

  ngOnInit() {
    this.getClassStudentsList();
    console.log(this.classId);
    console.log('this.classId');
  }

  getClassStudentsList() {
    return this.studentService.getStudentList().subscribe(res => this.dataSource = res);
  }

  print(div) {
    this.reportsService.print(div);
  }
}
