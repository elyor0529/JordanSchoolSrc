import { regParents } from './../../../../Models/Reg/Parents/reg-parents';
import { Component, OnInit, ViewChild } from "@angular/core";
import { StudentFee } from "src/app/Models/financial/student-fee";
import { MatTableDataSource, MatPaginator, MatDialog } from "@angular/material";
import { FinItemService } from "../../fin-item/fin-item.service";
import { FinItem } from "src/app/Models/financial/fin-item";
import { DeleteDialogComponent } from "src/app/shared/delete-dialog/delete-dialog.component";
import { StudentFeeService } from "../student-fee.service";
import { RegParentService } from "src/app/pages/Reg/parents/reg-parent.service";
import { users } from 'src/app/Models/Users/users';

@Component({
  selector: "app-student-fee-index",
  templateUrl: "./student-fee-index.component.html",
  styleUrls: ["./student-fee-index.component.scss"]
})
export class StudentFeeIndexComponent implements OnInit {
  dataSource: MatTableDataSource<StudentFee>;
  dataSourceDtl: MatTableDataSource<StudentFee>;
  dataSource2: any;
  loading = false;
  finItemList: any;

  parentList: regParents[];
  selected: any;
  parentId: any;
  studName: any;
  parentName: any;
  
  currentYear: any;
  currentYearId: number;
  schoolName: any;
  schoolId:any;

  cols = [
    { field: "studentId", header: "#" },
    { field: "studentName", header: "  الطالب    " },
    { field: "db", header: "عليه  " },
    { field: "cr", header: " له " },
    { field: "total", header: "  المجموع   " }
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public displayedColumns: string[] = this.cols.map(col => col.field).concat('actions');

  
  colsDtl = [
    { field: "finItemName", header: "  البند المالي " },
    { field: "db", header: "عليه  " },
    { field: "cr", header: " له " },
  ];
  @ViewChild(MatPaginator) paginatorDtl: MatPaginator;
  public displayedColumnsDtl: string[] = this.colsDtl.map(col => col.field); 

  constructor(
    private service: StudentFeeService,
    private dialog: MatDialog,
    private studentFeeService: StudentFeeService,
    private parentService: RegParentService
  ) {
    this.getParentList();
    this.dataSource = new MatTableDataSource<StudentFee>();
    this.dataSourceDtl = new MatTableDataSource<StudentFee>();

    
    let data = JSON.parse(localStorage.getItem("token")) as users;
    // this.loginService.sUserId = data.id;
    // this.loginService.sSchoolId = data.schoolId;
    // this.loginService.sSchoolName = data.schoolName;
    this.schoolId = data.schoolId;
    this.schoolName = data.schoolName;
    this.currentYear = data.yearName;
    this.currentYearId = data.yearId;
  }

  getStudentFeeList() {
    this.service.getStudentFeeList().subscribe(
      result => {
        (this.dataSource.data = result), (this.dataSource2 = result);
      },
      err => console.log("error in getStudentFeeList"),
      () => console.log("Comlit getStudentFeeList")
    );
  }

  GetStudFeesListByParent(id) {
    return this.service
      .GetStudFeesListByParent(this.currentYearId,id)
      .subscribe(res => {
        this.dataSource.data = res;
        
      });
  }

  GetStudFeesDtl(studId,studName) {
    return this.service
      .GetStudFeesDtl(this.currentYearId, studId)
      .subscribe(res => {
        this.dataSourceDtl.data = res
        
       let name=studName+" "+this.parentName
         this.studName = name;
       
      });
  }
  getParentList() {
    return this.parentService.getParentsList().subscribe(res => {
      this.parentList = res;
      
    });
  }
  onParentChanged(filterValue) {
    this.selected = filterValue;
    this.parentId = filterValue;
    this.service.GetStudFeesListByParent(this.currentYearId, filterValue).subscribe(res => {
      this.dataSource.data = res;
      let index = this.parentList.findIndex(p => p.id === this.parentId)
      this.parentName = this.parentList[index].fatherName;
      let name=res[0].studentName+" "+this.parentName
      this.GetStudFeesDtl(res[0].studentId, "")
      console.log("index="+index+"  parentId="+this.parentId+"  name="+name)
    });
  }

  deleteStudentFee(studentFee: StudentFee) {
    this.loading = true;
    this.service.deleteStudentFee(studentFee.id).subscribe(
      res => this.handleSuccess(),
      err => {
        this.handleErrors(), (this.loading = false);
      },
      () => (this.loading = false)
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

  private handleErrors() {}

  ngOnInit() {
    // this.getStudentFeeList();
  }
}
