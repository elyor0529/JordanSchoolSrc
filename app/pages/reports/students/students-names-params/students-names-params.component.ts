import { Component, OnInit } from '@angular/core';
import { ClassService } from 'src/app/pages/addLookups/classes/class.service';
import { users } from 'src/app/Models/Users/users';
import { lkpClass } from 'src/app/Models/addLookups/classes/lkpClass';
import { of } from 'rxjs';
// import { map } from 'rxjs/operators';
import { SectionService } from 'src/app/pages/addLookups/sections/section.service';
import { startWith, map, filter } from "rxjs/operators";


@Component({
  selector: 'app-students-names-params',
  templateUrl: './students-names-params.component.html',
  styleUrls: ['./students-names-params.component.scss']
})
export class StudentsNamesParamsComponent implements OnInit {

  sectionList: any;
  classList:lkpClass[];
  schoolId: any;
  classFilterValue: any;
  sectionFilterValue: any;
  ngxClassList: lkpClass[];
  currentYearId: number;
  currentYear: any;
  schoolName: any;
  constructor(
    private classService: ClassService,
    private sectionService: SectionService
  ) {

    let data = JSON.parse(localStorage.getItem("token")) as users;
    this.schoolId = data.schoolId;
    this.schoolName = data.schoolName;
    this.currentYear = data.yearName;
    this.currentYearId = data.yearId;
  }

  ngOnInit() {

    this.getSectionListBySchool();
    this.classFilterValue = null;
    this.sectionFilterValue = null;

  }


  getSchoolClassListBySection(sectionId: number) {
    return this.classService.GetClassBySection(sectionId).subscribe(res => {
    this.classList = res,
      this.ngxClassList = res
    }
    );
  }

  getSectionListBySchool() {
    return this.sectionService.sectionListBySchool(this.schoolId).subscribe(
      res => this.sectionList = res
    )

  }
  filterClasses() {

    const ngxClassTable = of(this.ngxClassList);
    console.log('this.ngxClassList');
    console.log(this.ngxClassList);
    console.log(this.classFilterValue);


    ngxClassTable.pipe(
      map(p => p.filter(x => {x.aname.includes(this.classFilterValue) ||
        x.id.toString().includes(this.classFilterValue),
      console.log("this.classFilterValue="+this.classFilterValue+"  "+x.aname)}))
    ).subscribe(res => {this.classList = res,
    console.log(res)})

  }

  onSectionChanged(filterValue: number) {
    console.log(filterValue);
    console.log('filterValue');

    this.getSchoolClassListBySection(filterValue);
  }


}
