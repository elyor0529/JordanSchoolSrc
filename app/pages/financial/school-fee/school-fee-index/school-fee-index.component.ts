import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { SchoolFee } from 'src/app/Models/financial/school-fee';
import { FinItemService } from '../../fin-item/fin-item.service';
import { FinItem } from 'src/app/Models/financial/fin-item';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { SchoolFeeService } from '../school-fee.service';
import { SchoolService } from 'src/app/pages/addLookups/schools/school.service';
import { SchoolFeeDialogComponent } from '../school-fee-dialog/school-fee-dialog.component';

@Component({
  selector: 'app-school-fee-index',
  templateUrl: './school-fee-index.component.html',
  styleUrls: ['./school-fee-index.component.scss']
})
export class SchoolFeeIndexComponent implements OnInit {



  dataSource: MatTableDataSource<SchoolFee>;
  dataSource2: any;
  loading = false;
  finItemList: any;
  schoolList: any;



  cols = [
    { field: "id", header: "#" },
   // { field: "schoolDesc", header: "  المدرسة    " },
   // { field: "yearDesc", header: " السنة  " },
    { field: "finItemDesc", header: " البند " },
    { field: "value", header: " القيمة  " }
  ]

  @ViewChild(MatPaginator) paginator: MatPaginator;
  public displayedColumns: string[] = this.cols.map(col => col.field).concat('actions');

  constructor(private service: SchoolFeeService,
    private dialog: MatDialog,
    private schoolFeeService: SchoolFeeService,
    private schoolService: SchoolService) {
    this.dataSource = new MatTableDataSource<SchoolFee>();
  }



  getSchoolFeeList() {
    this.service.getSchoolFeeList().subscribe(result => {
      this.dataSource.data = result,
        this.dataSource2 = result
    },
      err => console.log("error in getSchoolFeeList"),
      () => console.log("Comlit getSchoolFeeList")
    )
  }

  getSchoolList() {
    return this.schoolService.schoolList().subscribe(result => this.schoolList = result);
  }

  deleteFinItem(schoolFee: SchoolFee) {
    this.loading = true;
    this.service.deleteSchoolFee(schoolFee.id).subscribe(
      res => this.handleSuccess(),
      err => { this.handleErrors(), this.loading = false },
      () => this.loading = false
    );
  }

  openDeleteDialog(model: SchoolFee) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        name: `${model.finItemDesc}`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteFinItem(model);
      }
    });
  }

  onSchoolChanged(filterValue: number) {
    this.dataSource.filter = filterValue + "";
    this.service.selectedSchoolId = filterValue;

    this.schoolService.getSchool(filterValue).subscribe(res => {
       this.service.selectedSchoolDesc = res.aname
      console.log('fffff'+filterValue);
      console.log('fffff'+res.aname);
      
    }, err => console.log(err),
      () => this.loading = false);
  
  }


  private handleSuccess() {
    this.getSchoolFeeList();
  }

  private handleErrors() {
  }


  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  ngOnInit() {
    this.getSchoolFeeList();
    this.getSchoolList();
    
    this.dataSource.filterPredicate = (data: SchoolFee, filter: string) => {
      return data.schoolId == +filter;
    }
  };


  xxx() {

  }


  addNewSchoolFee() {

    console.log("hill");
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.direction = "rtl";
    const dialogRef = this.dialog.open(SchoolFeeDialogComponent, dialogConfig);
    //dialogRef.afterClosed().subscribe(res => {
    // this.onParentChanged(res.parentId);
    //});
  }

}



