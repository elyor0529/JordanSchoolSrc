import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { emailValidator } from '../../theme/utils/app-validators';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
import { LoginService } from './login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  public form:FormGroup;
  public settings: Settings;
  validLogin: boolean = false;
  msgLogin: any;


  constructor(public appSettings: AppSettings, public fb: FormBuilder, public router: Router,
  private service:LoginService) {
    this.settings = this.appSettings.settings; 
    this.form = this.fb.group({
      'email': [null, Validators.compose([Validators.required/*, emailValidator*/])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(4)])],
      'rememberMe': false
    });
  }

  public onSubmit(values:Object):void {
    if (this.form.valid) {

      this.msgLogin = "";
      let userName: string = this.form.get("email").value;
      let password: string = this.form.get("password").value;
      console.log("userName=" + userName + "   password=" + password);
     // let dd:boolean=this.checkLogin(userName, password);
     // console.log("valid=" + this.validLogin+"   dd="+dd);

      this.service.getUser(userName, password).subscribe(res => {
        if (res != null)
        {
          this.service.sUserId = res.id;
          this.service.sSchoolId = res.schoolId;
          this.service.sSchoolName = res.schoolName;
          console.log(this.service.sSchoolName);
          this.router.navigate(['../admissions/index']);
          
        }
        else
          this.msgLogin = "يرجى التحقق من إسم المستخدم أو كلمة المرور";
          
      }
      );
      // if (this.validLogin)
      // this.router.navigate(['../admissions/index']);
    }
  }

  ngAfterViewInit(){
    this.settings.loadingSpinner = false; 
  }

  //check Api Login

  checkLogin (userName: any, password: any):boolean {
    
    var cc = false;
    this.service.getUser(userName, password).subscribe(res => {
    
      if (res != null) return true; else return false; 
    },
      error => console.log("error"),
      () => { console.log("complite"); cc = this.validLogin }
    );
    console.log("this.validLogin="+this.validLogin+"   cc=" + cc);
    return true;
  }
}