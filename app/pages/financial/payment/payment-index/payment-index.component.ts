
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
import { regParents } from 'src/app/Models/Reg/Parents/reg-parents';
import { of } from 'rxjs'; 
import { startWith, map, filter } from "rxjs/operators";
import { finStudCard } from 'src/app/Models/financial/finStudCard';

@Component({
  selector: 'app-payment-index',
  templateUrl: './payment-index.component.html',
  styleUrls: ['./payment-index.component.scss']
})
export class PaymentIndexComponent implements OnInit {
  studentFeesDataSource:MatTableDataSource<StudentFee>;
  studentFeesDtlDataSource: MatTableDataSource<StudentFee>;
  dataSourceFinstudCard: finStudCard[];
  
  loading = false;
  parentList: regParents[];
  yearsList: any;
  parentId: any;
  currentYearId: number;
  currentYear: any;
  schoolName: any;
  schoolId:any;
  selected: any;
  parentFilterValue: any;
  ngxParentList: regParents[];
  

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

  colsCard = [
    { field: "firstName", header: "إسم الطالب" },
    { field: "s9", header: "  الخصومات (إذا وجدت) " },
    { field: "s10", header: "الرصيد السابق  " },
   
    { field: "s6", header: "  رسوم التسجيل " },
    { field: "s7", header: "  الرسوم الدراسية " },
    { field: "s8", header: " رسوم الباص " },
    
    { field: "sumDepit", header: "  مجموع الرسوم " },
    { field: "sumCredit", header: "  مجموع المدفوعات " },
    { field: "amtRemainder", header: "  المبلغ المتبقي " },
    
  ];
  @ViewChild(MatPaginator) paginatorCard: MatPaginator;
  public displayedColumnsCard: string[] = this.colsCard.map(col => col.field);

  public displayedColumns = ['firstName', 's9', 's10','s6','s7','s8','sumDepit','sumCredit','amtRemainder']
  .concat("actions");
  
  public settings: Settings;

  
  constructor(
    public appSettings: AppSettings,
   // private paymentService: PaymentService,
    private studentFeeService: PaymentService,
    private parentService: RegParentService,
    private dialog: MatDialog,
    private yearService: YearService

  ) {
    this.studentFeesDataSource = new MatTableDataSource<StudentFee>();
    this.studentFeesDtlDataSource = new MatTableDataSource<StudentFee>();
    this.dataSourceFinstudCard = [];

    this.settings = this.appSettings.settings;
    let data = JSON.parse(localStorage.getItem("token")) as users;
    this.schoolId = data.schoolId;
    this.schoolName = data.schoolName;
    this.currentYear = data.yearName;
    this.currentYearId = data.yearId;
    this.studentFeeService.sYearId=data.yearId;
    this.studentFeeService.selectedYearId = this.currentYearId;
    
  }


  getYearsList() {
    return this.yearService.getYearsList().subscribe(result => this.yearsList = result);
  }
  getParentList() {
    return this.parentService
      .getParentsList()
      .subscribe(res => { this.parentList = res; this.ngxParentList=res;});
  }

  onParentChanged(filterValue: number) {
  //  this.studentFeeService.selectedParentId = filterValue;
    this.studentFeeService.sParentId = filterValue; 
   // this.parentId = this.service.sParentName;
 
    let Index = this.parentList.findIndex(i => i.id === filterValue);
    if (Index != -1) { this.studentFeeService.sParentName = this.parentList[Index].fatherName; }

    this.parentId = filterValue;
    this.getFinStudCard();
    console.log("filterValue="+filterValue)
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
    this.parentFilterValue = null;
  }

  
  filterParents() {
    const ngxParentTable = of(this.ngxParentList);
    ngxParentTable.pipe(
      map(p => p.filter(x => x.fatherName.includes(this.parentFilterValue) ||
        x.id.toString().includes(this.parentFilterValue)))
    ).subscribe(res=>this.parentList=res)

  }

getFinStudCard() {
    return this.studentFeeService.FinStdCard(this.currentYearId,this.parentId).subscribe(res => this.dataSourceFinstudCard = res);
  }

  getamtRemainder() {
    return this.dataSourceFinstudCard.map(t => t.amtRemainder).reduce((acc, value) => acc + value, 0);
  }

  getsumDepit() {
    return this.dataSourceFinstudCard.map(t => t.sumDepit).reduce((acc, value) => acc + value, 0);
  }

  getsumCredit() {
    return this.dataSourceFinstudCard.map(t => t.sumCredit).reduce((acc, value) => acc + value, 0);
  }
  getS9() {
    return this.dataSourceFinstudCard.map(t => t.s9).reduce((acc, value) => acc + value, 0);
  }
  getS10() {
    return this.dataSourceFinstudCard.map(t => t.s10).reduce((acc, value) => acc + value, 0);
  }
  getS6() {
    return this.dataSourceFinstudCard.map(t => t.s6).reduce((acc, value) => acc + value, 0);
  }
  getS7() { 
    return this.dataSourceFinstudCard.map(t => t.s7).reduce((acc, value) => acc + value, 0);
  }
  getS8() {
    return this.dataSourceFinstudCard.map(t => t.s8).reduce((acc, value) => acc + value, 0);
  }
  

}
