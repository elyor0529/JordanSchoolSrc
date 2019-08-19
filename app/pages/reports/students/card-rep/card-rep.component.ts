import { RepService } from './../../rep.service';
import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../reports.service';
import { users } from 'src/app/Models/Users/users';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from 'src/app/pages/Reg/student/student.service';
import { StudCardData } from 'src/app/Models/Reg/Reports/StudCardData';

@Component({
  selector: 'app-card-rep',
  templateUrl: './card-rep.component.html',
  styleUrls: ['./card-rep.component.scss']
})
export class CardRepComponent implements OnInit {

  schoolName: any;
  schoolLName: any;
  id: any;  
  loading = false;
  yearId: any;

  selectedStudData: any = StudCardData;

  constructor(private reportsService: ReportsService,
    private route: ActivatedRoute,
    private service: RepService) {
     
    
    let data = JSON.parse(localStorage.getItem("token")) as users;
    // this.loginService.sUserId = data.id;
    // this.loginService.sSchoolId = data.schoolId;
    // this.loginService.sSchoolName = data.schoolName;
    // this.schoolId = data.schoolId;
    this.schoolName = data.schoolName;
    this.schoolLName = data.schoolLName;
    // this.currentYear = data.yearName;
     this.yearId = data.yearId;
   }

  ngOnInit() {
    this.getStudData();
  }

  print(div) {
    this.reportsService.print(div);
  }

  //Get Student Data
  getStudData() {
    this.route.params.subscribe(params => {
      if (!params.id) {
        return;
      }
      this.id = +params.id;
      this.service.getStudCardDataVw(this.yearId, this.id).subscribe(res => {
        this.selectedStudData = res;
     console.log(res);
      }, err => console.log(err),
      () => this.loading = false);
    });
  }


}
