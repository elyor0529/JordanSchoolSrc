import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { SchoolFee } from 'src/app/Models/financial/school-fee';
import { FinItemService } from '../../fin-item/fin-item.service';
import { FinItem } from 'src/app/Models/financial/fin-item';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { SchoolFeeService } from '../school-fee.service';
import { SchoolService } from 'src/app/pages/addLookups/schools/school.service';
import { SchoolFeeDialogComponent } from '../school-fee-dialog/school-fee-dialog.component';
import { YearService } from 'src/app/pages/addLookups/years/year.service';

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
  yearsList: any;



  cols = [
    { field: "id", header: "#" },
     { field: "schoolDesc", header: "  المدرسة    " },
    { field: "yearDesc", header: " السنة  " },
    { field: "finItemDesc", header: " البند " },
    { field: "value", header: " القيمة  " }
  ]

  @ViewChild(MatPaginator) paginator: MatPaginator;
  public displayedColumns: string[] = this.cols.map(col => col.field).concat('actions');

  constructor(private service: SchoolFeeService,
    private dialog: MatDialog,
    private schoolFeeService: SchoolFeeService,
    private yearService: YearService,
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


  getYearsList() {
    return this.yearService.getYearsList().subscribe(result => this.yearsList = result);
  }


  deleteFinItem(schoolFee: SchoolFee) {
    this.loading = true;
    this.service.deleteSchoolFee(schoolFee.id).subscribe(
      res => this.handleSuccess(),

      err => { 
        this.handleErrors(), 
        this.loading = false },
        
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

    }, err => console.log(err),
      () => this.loading = false);

  }


  onYearChanged(filterValue: number) {
    this.dataSource.filter = filterValue + "";
    this.service.selectedYearId = filterValue;
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
    this.getYearsList();

    this.dataSource.filterPredicate = (data: SchoolFee, filter: string) => {
      return data.schoolId == +filter;
    }
  };
 

 

  addNewSchoolFee() {

    console.log("hill");
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.direction = "rtl";
    dialogConfig.data = { id: 0,};
    const dialogRef = this.dialog.open(SchoolFeeDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
     // res != null ?  this.onYearChanged(this.service.selectedYearId):"";
     this.getSchoolFeeList();
    });
  }


  updateSchoolFee(schoolFeeId) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.direction = "rtl";
    console.log('schoolFeeId'+schoolFeeId);
    
    dialogConfig.data = { id: schoolFeeId };
    const dialogRef = this.dialog.open(SchoolFeeDialogComponent, dialogConfig);
  }

  


}



