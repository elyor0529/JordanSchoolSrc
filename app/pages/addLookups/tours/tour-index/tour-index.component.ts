import { lkpTour } from './../../../../Models/addLookups/tours/lkpTour';
import { SchoolService } from './../../schools/school.service';
import { TourService } from './../tour.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-tour-index',
  templateUrl: './tour-index.component.html',
  styleUrls: ['./tour-index.component.scss']
})
export class TourIndexComponent implements OnInit {

dataSource:MatTableDataSource<lkpTour>;
dataSource2:any;
schoolList:any;
loading=false;
cols=[
  {field:"id", header:"#"},
    {field:"tourName", header:"إسم الجولة"},
    {field:"tourFullPrice",header:"سعر الجولة كاملة"},
    {field:"tourHalfPrice",header:"سعر نصف الجولة"},
    {field:"schoolId", header:"المدرسة"}
]


  constructor(private service:TourService, private schoolService:SchoolService,
    private dialog: MatDialog) {
this.dataSource=new MatTableDataSource<lkpTour>();

   }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public displayedColumns: string[] = this.cols.map(col => col.field).concat('actions');
  
  ngOnInit() {
    this.getTourList();
    this.getSchoolList();
    
  }

  getTourList(){
    this.service.tourList().subscribe(
      res=>{this.dataSource.data=res, this.dataSource2=res}
    )
  }
  getSchoolList(){
    this.schoolService.schoolList().subscribe(
      res=>this.schoolList=res
    )
  }

  onSchoolChange(value){
    this.dataSource=this.dataSource2.filter(f=>f.schoolId==value);
  }

  
deleteTour(tour: lkpTour) {
  this.loading = true;
  this.service.deleteTour(tour.id).subscribe(
    res => this.handleSuccess(),
    err => {this.handleErrors(),this.loading = false},
    () => this.loading = false
  );
}
  
  
openDeleteDialog(model: lkpTour) {
  const dialogRef = this.dialog.open(DeleteDialogComponent, {
    data: {
      name: `${model.id}`
    }
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result === true) {
      this.deleteTour(model);
    }
  });
}
  
private handleSuccess() {
  this.getTourList();
}

private handleErrors() {
}
  

}
