import { Component, OnInit } from '@angular/core';
import { ClassService } from 'src/app/pages/addLookups/classes/class.service';

@Component({
  selector: 'app-students-names-params',
  templateUrl: './students-names-params.component.html',
  styleUrls: ['./students-names-params.component.scss']
})
export class StudentsNamesParamsComponent implements OnInit {

  classList: any;

  constructor(
    private classService: ClassService
  ) { }

  ngOnInit() {
    this.getClassList();

  }


  getClassList() {
    return this.classService.classList().subscribe(res =>
      this.classList = res
    );
  }
}
