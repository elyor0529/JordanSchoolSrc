import { AdmService } from './../../../Admission/adm.service';
import { ClassService } from './../../../addLookups/classes/class.service';
import { RegStudService } from './../reg-stud.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { StudReg } from 'src/app/Models/Reg/YearlyStudReg/StudReg';
import { regParents } from 'src/app/Models/Reg/Parents/reg-parents';
import { RegParentService } from '../../parents/reg-parent.service';
import { Class } from 'src/app/Models/addLookups/classes/class';
import { users } from 'src/app/Models/Users/users';
import { StudRegVw } from 'src/app/Models/Reg/YearlyStudReg/StudRegVw';


@Component({
  selector: 'app-reg-stud',
  templateUrl: './reg-stud.component.html',
  styleUrls: ['./reg-stud.component.scss']
})
export class RegStudComponent implements OnInit {


  
 
  public displayedColumns = ['id', 'firstName', 'className', 'nextClassName', 'nextClassPrice',
     'tourPrice', 'descountValue',
  'approvedId'].concat("actions");;
  // public displayedColumns: string[] = this.cols
  // .map(col => col.field)
  // .concat("actions");
  public transactions: Transaction[] = [
    {item: 'Beach ball', cost: 4},
    {item: 'Towel', cost: 5},
    {item: 'Frisbee', cost: 2},
    {item: 'Sunscreen', cost: 4},
    {item: 'Cooler', cost: 25},
    {item: 'Swim suit', cost: 15},
  ];

  
  parentList: regParents[];
  parentId: any;
  loading = false;
  selected: any;
  classList: Class[];
  newClass: any;
  ConfirmStudRegMsg: any;
  ConfirmStudRegId: any;
  currentYear: any;
  currentYearId: number;
  schoolName: any;
  schoolId:any;

  // cols = [
  //   { field: "id", header: "#" },
  //   { field: "firstName", header: "إسم الطالب " },
  //   { field: "className", header: "  الصف القديم" },
  //   { field: "newClassId", header: "  newClassId" },
  //   { field: "newClassName", header: "  الصف الجديد" },
  //   { field: "classPrice", header: "سعر الصف" }, 
  //   { field: "studExist", header: "StudExist" }, 
  //    { field: "tourName", header: " المنطقة" },
  //    { field: "tourTypeName", header: " إشتراك الباص" },
  //    { field: "tourPrice", header: "مبلغ الباص" },
  //    { field: "yearId", header: "yearId" },
  //   // { field: "studentBrotherSeq", header: "ترتيب الابناء" },
  // //  { field: "descountValue", header: "قيمة الخصم" },
  // //  { field: "yearIdx", header: "yearIdx", type: "hidden" },
  // //  { field: "totalPrice", header: "المبلغ المطلوب" },
  // ];
  dataSource: StudRegVw[];// MatTableDataSource<StudReg>;// = new MatTableDataSource<StudReg>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // public displayedColumns: string[] = this.cols
  //   .map(col => col.field)
  //   .concat("actions");

  constructor(private service: RegStudService,
    private parentService: RegParentService,
    private classService: ClassService,
  private admService:AdmService) {
    

    let data = JSON.parse(localStorage.getItem("token")) as users;
    // this.loginService.sUserId = data.id;
    // this.loginService.sSchoolId = data.schoolId;
    // this.loginService.sSchoolName = data.schoolName;
    this.schoolId = data.schoolId;
    this.schoolName = data.schoolName;
    this.currentYear = data.yearName;
    this.currentYearId = data.yearId;
    //console.log("**  year=" + this.currentYearId + "    this.currentYearName=" + this.currentYear);
    

    this.getParentList();
    this.getClassList();
    this.dataSource = [];
    this.onParentChanged(3+"");
   }

  ngOnInit() {
  }

  getParentChildrens() {
    return this.service.getParentChildrens(this.parentId).subscribe(res=>this.dataSource=res)
  }
  getParentList() {
    return this.parentService.getParentsList().subscribe(res => {
      this.parentList = res;
    });
  }
  onParentChanged(filterValue: string) {
    this.selected = filterValue;
    this.parentId = filterValue;
    this.service.getParentChildrens(filterValue).subscribe(res => {
      this.dataSource = res;
    });
  }

  
  getClassList() {
    return this.classService
      .classList()
      .subscribe(res => (this.classList = res));
  }

  onClassChange(id: any) {
    let index = this.classList.findIndex(i => i.id === id);
    let xClass ;
     if (index != -1) {
       xClass = this.classList[index].id;
    //   //  this.selected = this.parentList[index].id;
    // //  this.onParentChanged(this.selected);
     }
    console.log("id="+id+"   index="+index+"  xClass="+xClass);
    this.newClass = id;
  }
  // Confirm the Registration

  confirmStudReg(id,newClassId) {
    
    console.log("id=" + id + "  year=" + this.currentYearId +"    this.currentYearName="+this.currentYear+ "     newClassId="+newClassId);
    return this.service.ConfirmStudReg(id, this.currentYearId, newClassId).subscribe(res => {
      this.onParentChanged(this.selected);
      let msg = res;
    })
  }

  

    /** Gets the total cost of all transactions. */
    getTotalCost() {
      return this.transactions.map(t => t.cost).reduce((acc, value) => acc + value, 0);
    }
  
    getTotalClassPrice() {
      return this.dataSource.map(t =>t.nextClassPrice).reduce((acc, value) => acc + value, 0);
    }
    getTotalTourPrice() {
      return this.dataSource.map(t =>t.tourPrice).reduce((acc, value) => acc + value, 0);
    }
  
    getDescountValue() {
      return this.dataSource.map(t =>t.descountValue).reduce((acc, value) => acc + value, 0);
    }
  
  getTotalPrice() {
    return this.getTotalClassPrice() + this.getTotalTourPrice() - this.getDescountValue();
  }
    
  
}


export interface Transaction {
  item: string;
  cost: number;
}
