import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { ClassFee } from 'src/app/Models/financial/class-fee';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { ClassFeeService } from '../class-fee.service';

@Component({
  selector: 'app-class-fee-index',
  templateUrl: './class-fee-index.component.html',
  styleUrls: ['./class-fee-index.component.scss']
})
export class ClassFeeIndexComponent implements OnInit {

  dataSource: MatTableDataSource<ClassFee>;
  dataSource2: any;
  loading = false;
  classFeeList: any;
 

  cols = [
    { field: "id", header: "#" },
    { field: "yearId", header: "  السنه    " },
    { field: "classId", header: " الصف  " },
    { field: "sectionId", header: " القسم  " },
    { field: "finItemId", header: " البند " },
    { field: "value", header: "  القيمة   " },
  ]


  @ViewChild(MatPaginator) paginator: MatPaginator;
  public displayedColumns: string[] = this.cols.map(col => col.field).concat('actions');

  constructor(private service: ClassFeeService,
    private dialog: MatDialog, ) {
    this.dataSource = new MatTableDataSource<ClassFee>();
  }



  getClassFeeList() {
    this.service.getClassFeeList().subscribe(result => {
      this.dataSource.data = result,
        this.dataSource2 = result
    },
      () => console.log("error in getClassFeeList"),
      () => console.log("Comlit getClassFeeList")
    )
  }


  deleteClassFee(classFee: ClassFee) {
    this.loading = true;
    this.service.deleteClassFee(classFee.id).subscribe(
      () => this.handleSuccess(),
      () => { this.handleErrors(), this.loading = false },
      () => this.loading = false
    );
  }

  openDeleteDialog(model: ClassFee) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        name: `${model.finItemId}`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteClassFee(model);
      }
    });
  }

  onLookupChanged(filterValue: string) {
    this.dataSource.filter = filterValue + "";
  }


  private handleSuccess() {
    this.getClassFeeList();
  }

  private handleErrors() {
  }


  ngOnInit() {
    this.getClassFeeList();

  };


}




