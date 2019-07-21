import { Component, OnInit, ViewChild } from '@angular/core';
import { FinItem } from 'src/app/Models/financial/fin-item';
import { MatTableDataSource, MatDialog, MatPaginator, MatSort } from '@angular/material';
import { FinItemService } from '../fin-item.service';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-fin-item-index',
  templateUrl: './fin-item-index.component.html',
  styleUrls: ['./fin-item-index.component.scss']
})
export class FinItemIndexComponent implements OnInit {

  dataSource: MatTableDataSource<FinItem>;
  dataSource2: any;
  loading = false;
  finItemList: any;



  cols = [
    { field: "id", header: "#" },
    { field: "arDesc", header: " الاسم بالعربي  " },
    { field: "laDesc", header: "الاسم بالانجليزي" },
    { field: "cdTypeDesc", header: "خصم/اضافة" },
   // { field: "cdTypeDesc", header: " قيمة/نسبة  " },
   // { field: "vpTypeId", header: " قيمة/نسبة  " },
    { field: "vpTypeDesc", header: " قيمة/نسبة  " }
  ]

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public displayedColumns: string[] = this.cols.map(col => col.field).concat('actions');

  constructor(private service: FinItemService,
    private dialog: MatDialog,
    private finItemService: FinItemService, ) {
    this.dataSource = new MatTableDataSource<FinItem>();
  }



  getFinItemList() {
    this.service.getFinItemList().subscribe(result => {
      this.dataSource.data = result,
        this.dataSource2 = result,
        this.dataSource.paginator = this.paginator
    //    this.paginator.length = result.length;
    },
      err => console.log("error in getFinItemList"),
      () => console.log("Comlit getFinItemList")
    )
  }


  deleteFinItem(finItem: FinItem) {
    this.loading = true;
    this.service.deleteFinItem(finItem.id).subscribe(
      res => this.handleSuccess(),
      err => { this.handleErrors(), this.loading = false },
      () => this.loading = false
    );
  }

  openDeleteDialog(model: FinItem) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        name: `${model.arDesc}`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteFinItem(model);
      }
    });
  }

  onLookupChanged(filterValue: string) {
    this.dataSource.filter = filterValue + "";
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private handleSuccess() {
    this.getFinItemList();
  }

  private handleErrors() {
  }


  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  ngOnInit() {
    this.getFinItemList();

  };


}




