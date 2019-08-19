import { LkpSection } from './../../../../Models/addLookups/sections/lkpSection';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SectionService } from '../section.service';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { SchoolService } from '../../schools/school.service';

@Component({
  selector: 'app-section-index',
  templateUrl: './section-index.component.html',
  styleUrls: ['./section-index.component.scss']
})
export class SectionIndexComponent implements OnInit {

dataSource:MatTableDataSource<LkpSection>;
dataSource2:any;
loading=false;
schoolList:any;

  cols=[
    {field:"id", header:"#"},
    {field:"sectionName", header:"إسم القسم"},
    {field:"managerId",header:"المدير"},
    {field:"email",header:"الايميل"},
    {field:"nationalId",header:"الرقم الوطني"},
    {field:"schoolId", header:"المدرسة"},
  ]

  @ViewChild(MatPaginator) paginator: MatPaginator;
  public displayedColumns: string[] = this.cols.map(col => col.field).concat('actions');
  
  constructor(private service:SectionService,
    private dialog: MatDialog,
    private schoolService: SchoolService,) {
    this.dataSource=new MatTableDataSource<LkpSection>();
    this.getSchoolList();
   }


   
  getSchoolList(){
    return this.schoolService.schoolList().subscribe(result=>this.schoolList=result);
  }

  getSections(){
    this.service.sectionList().subscribe(result=>{
      this.dataSource.data=result,
    this.dataSource2=result},
      err=>console.log("error in getSetions"),
      ()=>console.log("Comlit getSections")
    )
  }

  
deleteSchool(school: LkpSection) {
  this.loading = true;
  this.service.deleteSection(school.id).subscribe(
    res => this.handleSuccess(),
    err => {this.handleErrors(),this.loading = false},
    () => this.loading = false
  );
}

openDeleteDialog(model: LkpSection) {
  const dialogRef = this.dialog.open(DeleteDialogComponent, {
    data: {
      name: `${model.sectionName}`
    }
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result === true) {
      this.deleteSchool(model);
    }
  });
}

onLookupChanged(filterValue: string){
 
  // filterValue= filterValue+" ";
  // filterValue = filterValue.trim(); // Remove whitespace
  // filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
  this.dataSource.filter = filterValue+"";
   /// this.getSections();
   //console.log(value);
    //this.dataSource.filter=value//this.dataSource2.filter(data=>data.schoolId==value);
}
private handleSuccess() {
  this.getSections();
}

private handleErrors() {
}


  ngOnInit() {
    this.getSections();
    this.dataSource.filterPredicate = (data: LkpSection, filter: string) => {
     return data.schoolId == +filter;
    };


    // this.dataSource.filterPredicate = (data: Element, filter: string) => {
    //   return data.name == filter;
    //  };
  }



}
