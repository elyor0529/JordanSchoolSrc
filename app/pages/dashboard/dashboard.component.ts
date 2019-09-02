import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../addLookups/schools/school.service';
import { DomSanitizer } from '@angular/platform-browser';
import { users } from 'src/app/Models/Users/users';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private schoolService: SchoolService,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.login();
  }

  image: any;
  schoolName: any;
  currentYear: any;
  login() {
    let data = JSON.parse(localStorage.getItem("token")) as users;
    this.schoolName = data.schoolName;
    this.currentYear = data.yearName;
    let id = data.schoolId;
    this.schoolService.getSchool(id).subscribe(res => {
      let objectURL = "data:image/jpeg;base64," + res.imageFile;
      this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    });
  }

}
