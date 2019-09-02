import { Component, OnInit } from '@angular/core';
import { regParents } from 'src/app/Models/Reg/Parents/reg-parents';
import { RegParentService } from '../../parents/reg-parent.service';

@Component({
  selector: 'app-get-parent',
  templateUrl: './get-parent.component.html',
  styleUrls: ['./get-parent.component.scss']
})
export class GetParentComponent implements OnInit {

  parentList: regParents[];
  selected: any;
  parentId: any;

  constructor( private parentService: RegParentService) { }

  ngOnInit() {
  }

  


}
