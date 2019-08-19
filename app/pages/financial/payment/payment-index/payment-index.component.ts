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



  paymentsDataSource: MatTableDataSource<Payment>;
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
   

  paymentcols = [
    { field: "id", header: "#" },
    //  { field: "regParentId", header: "    رقم الاب    " },
    //{ field: "fatherName", header: "ولي الأمر" },
    // { field: "yearDesc", header: " السنة  " },
    { field: "voucherId", header: "  رقم الوصل    " },
    //  { field: "voucherTypeId", header: " نوع الوصل  " },
    { field: "voucherTypeDesc", header: " نوع الوصل " },
    //  { field: "voucherStatusId", header: " حالة الوصل  " },
    { field: "voucherStatusDesc", header: " حالة الوصل " },
    { field: "debit", header: " عليه  " },
    // { field: "credit", header: " له  " }//,
    // { field: "note", header: " ملاحظة  " }
  ]
  public paymentDisplayedColumns: string[] = this.paymentcols.map(col => col.field).concat('actions');
  
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
    { field: "cr", header: " له " },
  ];
  @ViewChild(MatPaginator) paginatorDtl: MatPaginator;
  public studentFeesDtlDisplayedColumns: string[] = this.studentFeesDtlCols.map(col => col.field); 
  public settings: Settings;


  constructor(
    public appSettings: AppSettings,
    private service: PaymentService,
    private studentFeeService: StudentFeeService,
    private parentService: RegParentService,
    private dialog: MatDialog,
    private yearService: YearService

  ) {
    this.paymentsDataSource = new MatTableDataSource<Payment>();
    this.studentFeesDataSource = new MatTableDataSource<StudentFee>();
    this.studentFeesDtlDataSource = new MatTableDataSource<StudentFee>();
    this.settings = this.appSettings.settings;
    let data = JSON.parse(localStorage.getItem("token")) as users;
    this.schoolId = data.schoolId;
    this.schoolName = data.schoolName;
    this.currentYear = data.yearName;
    this.currentYearId = data.yearId;
    this.service.selectedYearId=this.currentYearId;
  }


  getYearsList() {
    return this.yearService.getYearsList().subscribe(result => this.yearsList = result);
  }

  getPaymentList() {
    this.service.getPaymentList().subscribe(result => {
      this.paymentsDataSource.data = result
    },
      err => console.log("error in getPaymentList"),
      () => console.log("Comlit getPaymentList")
    )
  }



 

  getParentList() {
    return this.parentService
      .getParentsList()
      .subscribe(res => (this.parentList = res));
  }


  onParentChanged(filterValue: number) {
    //this.dataSource.filter = filterValue + "";
    this.service.selectedParentId = filterValue;
    // this.service.getByParentIdYearId().subscribe(
    //   res => {
    //     this.paymentsDataSource.data = res
    //   });

    this.studentFeeService.GetStudFeesListByParent(filterValue).subscribe(res => {
      this.studentFeesDataSource.data = res;
      // let index = this.parentList.findIndex(p => p.id === this.parentId)
      // this.parentName = this.parentList[index].fatherName;
      // let name=res[0].studentName+" "+this.parentName
      // this.GetStudFeesDtl(res[0].studentId, "")
      // console.log("index="+index+"  parentId="+this.parentId+"  name="+name)
    });

  }


  GetStudFeesDtl(studId,studName) {
    return this.studentFeeService
      .GetStudFeesDtl(this.currentYearId, studId)
      .subscribe(res => {
        this.studentFeesDtlDataSource.data = res
        
      //  let name=studName+" "+this.parentName
        //  this.studName = name;
       
      });
  }

  onYearChanged(filterValue: number) {
   // this.dataSource.filter = filterValue + "";
    this.service.selectedYearId = filterValue;
    this.service.getByParentIdYearId().subscribe(
      res => {
        this.paymentsDataSource.data = res
      });
  }


  addNewPayment() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.direction = "rtl";
    dialogConfig.data = { id: 0, };
    const dialogRef = this.dialog.open(PaymentDialogComponent, dialogConfig)
    dialogRef.afterClosed().subscribe(res => {
      this.getPaymentList();
    }
    );
  }

  updatePayment(paymentId) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.direction = "rtl";
    dialogConfig.data = { id: paymentId };
    const dialogRef = this.dialog.open(PaymentDialogComponent, dialogConfig);
  }

  openDeleteDialog(model: Payment) {
    const dialogoRef = this.dialog.open(DeleteDialogComponent, {
      data:
      {
        name: `${model.voucherTypeDesc}`
      }
    });
    dialogoRef.afterClosed().subscribe(
      result => {
        (result === true)
        this.deletePayment(model);
      }
    );
  }
  deletePayment(model: Payment) {
    this.loading = true;
    this.service.deletePayment(model.id).subscribe(
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
    this.getPaymentList();
  }

  private handleErrors() {

  }
  ngOnInit() {
    this.getPaymentList();
    this.getParentList();
    this.getYearsList();
  }

}
