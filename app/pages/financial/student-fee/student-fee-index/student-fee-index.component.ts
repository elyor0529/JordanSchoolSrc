import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentFee } from 'src/app/Models/financial/student-fee';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { FinItemService } from '../../fin-item/fin-item.service';
import { FinItem } from 'src/app/Models/financial/fin-item';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { StudentFeeService } from '../student-fee.service';

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

 

  cols = [
    { field: "id", header: "#" },
    { field: "studentId", header: " رقم الطالب    " },
    { field: "yearId", header: "السنة  " },
    { field: "finItemId", header: " البند " },
    { field: "value", header: "  القيمة   " },
  ]


  @ViewChild(MatPaginator) paginator: MatPaginator;
  public displayedColumns: string[] = this.cols.map(col => col.field).concat('actions');

  constructor(private service: StudentFeeService,
    private dialog: MatDialog,
    private studentFeeService: StudentFeeService, ) {
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
    this.getStudentFeeList();

  };


}





