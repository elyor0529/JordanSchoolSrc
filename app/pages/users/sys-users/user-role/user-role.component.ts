import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ValidationBase } from 'src/app/validationBase';
import { Router, ActivatedRoute } from '@angular/router';
import { userRoleService } from './userRole.service';

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.scss']
})
export class UserRoleComponent implements OnInit {


  
  
  form:FormGroup;
  loading = false;
  edit = false;
  returnUrl = '/users/index';
  id: number;
  
  roleList: any;

  constructor(
    private service: userRoleService,
    private formbuilder: FormBuilder,
    public validator: ValidationBase,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getRoleList();
    this.setupUpdate();
    this.initForm();
  }

  getRoleList() {
    return this.service.getRoleList().subscribe(res => this.roleList = res)
  }

  //Update
  setupUpdate() {
    this.route.params.subscribe(params => {
      if (!params.id) {
        return;
      }

      this.id = +params.id;
      this.edit = true;
      this.loading = true;
     
      this.service.getUserById(this.id).subscribe(res => {
        if (res == null) this.edit = false
        else
        this.form = this.validator.patchForm(this.form, res);
    
        console.log(res);
      }, err => { this.edit = false; console.log("xxxxxxxxxxxxxx") },
      () => this.loading = false);
    });
  }

  
  initForm() {
    this.form = this.formbuilder.group({
      id: [0],
      userId: [this.id],
      roleId: [''],
    
    })
  }

  submit() {
    
    if (!this.form.valid) {
      this.validator.markFormTouched(this.form);
      return;
    }
       
    this.loading = true;
    this.edit?this.updateUser():this.addUser();
    
  }

  updateUser() {
    this.service.updateUser(this.id, this.form.value).subscribe(
      res => {
        this.router.navigateByUrl(this.returnUrl);
      },
      err => console.log(err)
    );
  }
  //Add
  addUser() {
    this.service.addUser(this.form.value).subscribe(
      res => {
        this.router.navigateByUrl(this.returnUrl);
      },
      err => console.log(err)
    );
  }
}
