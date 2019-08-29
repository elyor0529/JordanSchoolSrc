import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialogConfig, MatDialog, MatPaginator } from '@angular/material';
import { Payment } from 'src/app/Models/financial/payment';
import { PaymentService } from '../payment.service';
import { RegParentService } from 'src/app/pages/Reg/parents/reg-parent.service';
import { AppSettings } from 'src/app/app.settings';
import { Settings } from 'src/app/app.settings.model';
import { PaymentDialogComponent } from '../payment-dialog/payment-dialog.component';
import { YearService } from 'src/app/pages/addLookups/years/year.service';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { StudentFee } from 'src/app/Models/financial/student-fee';
import { StudentFeeService } from '../../student-fee/student-fee.service';
import { users } from 'src/app/Models/Users/users';

@Component({
  selector: 'app-payment-index',
  templateUrl: './payment-index.component.html',
  styleUrls: ['./payment-index.component.scss']
})
export class PaymentIndexComponent implements OnInit {
  studentFeesDataSource:MatTableDataSource<StudentFee>;
  studentFeesDtlDataSource:MatTableDataSource<StudentFee>;
  loading = false;
  parentList: any;
  yearsList: any;
  parentId: any;
  currentYearId: number;
  currentYear: any;
  schoolName: any;
  schoolId:any;
   

  studentFeesCols = [
    { field: "studentId", header: "#" },
    { field: "studentName", header: "  الطالب    " },
    { field: "db", header: "عليه  " },
    { field: "cr", header: " له " },
    { field: "total", header: "  المجموع   " }
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public studentFeesDisplayedColumns: string[] = this.studentFeesCols.map(col => col.field).concat('actions');

  
  studentFeesDtlCols = [
    { field: "finItemName", header: "  البند المالي " },
    { field: "db", header: "عليه  " },
    { field: "cr", header: " له  " },
    { field: "paymentId", header: " رقم الدفعة " }
  ];
  @ViewChild(MatPaginator) paginatorDtl: MatPaginator;
  public studentFeesDtlDisplayedColumns: string[] = this.studentFeesDtlCols.map(col => col.field); 
  public settings: Settings;


  constructor(
    public appSettings: AppSettings,
   // private paymentService: PaymentService,
    private studentFeeService: StudentFeeService,
    private parentService: RegParentService,
    private dialog: MatDialog,
    private yearService: YearService

  ) {
    this.studentFeesDataSource = new MatTableDataSource<StudentFee>();
    this.studentFeesDtlDataSource = new MatTableDataSource<StudentFee>();
    this.settings = this.appSettings.settings;
    let data = JSON.parse(localStorage.getItem("token")) as users;
    this.schoolId = data.schoolId;
    this.schoolName = data.schoolName;
    this.currentYear = data.yearName;
    this.currentYearId = data.yearId;
    this.studentFeeService.selectedYearId=this.currentYearId;
  }


  getYearsList() {
    return this.yearService.getYearsList().subscribe(result => this.yearsList = result);
  }
  getParentList() {
    return this.parentService
      .getParentsList()
      .subscribe(res => (this.parentList = res));
  }

  onParentChanged(filterValue: number) {
    this.studentFeeService.selectedParentId = filterValue;
    this.studentFeeService.GetStudFeesListByParent(this.currentYearId,filterValue).subscribe(res => {
      this.studentFeesDataSource.data = res;
    });
  }

  GetStudFeesDtl(studId,studName) {
    return this.studentFeeService
      .GetStudFeesDtl(this.currentYearId, studId)
      .subscribe(res => {
        this.studentFeesDtlDataSource.data = res
      });
  }


  addNewPayment() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.direction = "rtl";
    dialogConfig.data = { id: 0, };
    const dialogRef = this.dialog.open(PaymentDialogComponent, dialogConfig)
    dialogRef.afterClosed().subscribe(res => {
    }
    );
  }

  updatePayment(studentFeeId) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.direction = "rtl";
    dialogConfig.data = { id: studentFeeId };
    const dialogRef = this.dialog.open(PaymentDialogComponent, dialogConfig);
  }

  openDeleteDialog(model: StudentFee) {
    const dialogoRef = this.dialog.open(DeleteDialogComponent, {
      data:
      {
        name: `${model.finItemDesc}`
      }
    });
    dialogoRef.afterClosed().subscribe(
      result => {
        (result === true)
        this.deletePayment(model);
      }
    );
  }

  deletePayment(model: StudentFee) {
    this.loading = true;
    this.studentFeeService.deleteStudentFee(model.id).subscribe(
      res => this.handleSuccess(),
      err => {
        this.handleErrors()
        this.loading = false
      },

      () => this.loading = false
    )
    err => { }
  }


  private handleSuccess() {
   // this.getPaymentList();
  }

  private handleErrors() {

  }
  ngOnInit() {
   // this.getPaymentList();
    this.getParentList();
    this.getYearsList();
  }

}
