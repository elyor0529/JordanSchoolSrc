import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentFee } from 'src/app/Models/financial/student-fee';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { FinItemService } from '../../fin-item/fin-item.service';
import { FinItem } from 'src/app/Models/financial/fin-item';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { StudentFeeService } from '../student-fee.service';
import { RegParentService } from 'src/app/pages/Reg/parents/reg-parent.service';

@Component({
  selector: 'app-student-fee-index',
  templateUrl: './student-fee-index.component.html',
  styleUrls: ['./student-fee-index.component.scss']
})
export class StudentFeeIndexComponent implements OnInit {


  dataSource: MatTableDataSource<StudentFee>;
  dataSource2: any;
  loading = false;
  finItemList: any;

  parentList: any;
  selected: any;
  parentId: any;
 

  cols = [
    { field: "studentId", header: "#" },
    { field: "studentName", header: "  الطالب    " },
    { field: "db", header: "عليه  " },
    { field: "cr", header: " له " },
    { field: "total", header: "  المجموع   " },
  ]


  @ViewChild(MatPaginator) paginator: MatPaginator;
  public displayedColumns: string[] = this.cols.map(col => col.field);//.concat('actions');

  constructor(private service: StudentFeeService,
    private dialog: MatDialog,
    private studentFeeService: StudentFeeService,
    private parentService: RegParentService) {
    this.getParentList();
    this.dataSource = new MatTableDataSource<StudentFee>();
  }



  getStudentFeeList() {
    this.service.getStudentFeeList().subscribe(result => {
      this.dataSource.data = result,
        this.dataSource2 = result
    },
      err => console.log("error in getStudentFeeList"),
      () => console.log("Comlit getStudentFeeList")
    )
  }

  GetStudFeesListByParent(id) {
    return this.service.GetStudFeesListByParent(id).subscribe(res => this.dataSource.data = res);
  }

  getParentList() {
    return this.parentService.getParentsList().subscribe(res => {
      this.parentList = res;
    });
  }
  onParentChanged(filterValue) {
    this.selected = filterValue;
    this.parentId = filterValue;
    this.service.GetStudFeesListByParent(filterValue).subscribe(res => {
      this.dataSource.data = res;
    });
  }

  deleteStudentFee(studentFee: StudentFee) {
    this.loading = true;
    this.service.deleteStudentFee(studentFee.id).subscribe(
      res => this.handleSuccess(),
      err => { this.handleErrors(), this.loading = false },
      () => this.loading = false
    );
  }

  openDeleteDialog(model: StudentFee) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        name: `${model.finItemId}`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteStudentFee(model);
      }
    });
  }

  onLookupChanged(filterValue: string) {
    this.dataSource.filter = filterValue + "";
  }


  private handleSuccess() {
    this.getStudentFeeList();
  }

  private handleErrors() {
  }


  ngOnInit() {
   // this.getStudentFeeList();

  };


}





