import { forEach } from '@angular/router/src/utils/collection';
import { StudentService } from 'src/app/pages/Reg/student/student.service';
import { UsersService } from './../users.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatDialog } from '@angular/material';
import { User } from '../user.model';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { SysusersService } from './sysusers.service';
import { users } from 'src/app/Models/Users/users';
import { usersSchool } from 'src/app/Models/Users/usersSchool';
import { id } from '@swimlane/ngx-charts/release/utils';

@Component({
  selector: 'app-sys-users',
  templateUrl: './sys-users.component.html',
  styleUrls: ['./sys-users.component.scss']
})
export class SysUsersComponent implements OnInit {


  dataSource: users;
  dataSource2:  users[] =[];
  loading=false;
  
  public displayedColumns = ['id', 'username', 'password', 'usersSchool.schoolId',
  'roleName'].concat("actions");
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  //public displayedColumns: string[] = this.cols.map(col => col.field).concat('actions');


  
  constructor(private service: SysusersService, private dialog: MatDialog,
  private xService: UsersService, private studService: StudentService) { }

  ngOnInit() {
  //  console.log("1111111");
    this.getUserList();
  }

  getUserList(){
    return this.service.getUsers().subscribe(res =>
    
    
    {
    this.dataSource = res; 
      [res].forEach(element => {
        console.log(element.usersSchool)
      //  console.log(element.usersSchool.id)
        
      //  for (let index = 0; index < element.usersSchool.length; index++) {
      //    console.log(element.usersSchool[index].schoolId)
         
      //  }
         
    
  });  
  
  });

    
  }

  
//Delete
delete(parent: User) {
  this.loading = true;
  this.service.deleteUser(parent.id).subscribe(
    res => this.handleSuccess(),
    err => {this.handleErrors(),this.loading = false},
    () => this.loading = false
  );
}
  
  
openDeleteDialog(model: User) {
  const dialogRef = this.dialog.open(DeleteDialogComponent, {
    data: {
      name: `${model.username}`
    }
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result === true) {
      this.delete(model);
    }
  });
}
  
private handleSuccess() {
  this.getUserList();
}

private handleErrors() {
}

  
}
