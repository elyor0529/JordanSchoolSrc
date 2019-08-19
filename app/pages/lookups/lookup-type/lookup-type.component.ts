import { LkpLookupType } from './../../../Models/Lookups/lkplookuptype';
import { LookupTypeApiService } from './../lookup-type-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lookup-type',
  templateUrl: './lookup-type.component.html',
  styleUrls: ['./lookup-type.component.scss']
})
export class LookupTypeComponent implements OnInit {

lookupType;
public dataSource:LkpLookupType[];
public List: LkpLookupType[];

public cols=[
  {header:"#", field:"id"},
  {header:"الاسم", field:"name"}
];

public displayedColumns: string[] = this.cols.map(col => col.field);

  constructor(private service:LookupTypeApiService) {
    this.dataSource=[];
    this.List=[];



   }

getLookupType(){

  this.service.LookupTypes().subscribe(
get=>{console.log(get), this.dataSource=get, this.List=get},
err=>console.log("error"),
()=>console.log("complite"))
}

  onLookupTypedChanged(value){
   
   
   if (value==0)
   this.getLookupType();
   else
   this.dataSource = this.List.filter(c=>c.id == value);
    console.log(this.dataSource);
  }

  ngOnInit() {
    this.getLookupType();
  }

}
