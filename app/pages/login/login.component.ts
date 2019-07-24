import { UsersService } from './../users/users.service';
import { User } from "./../users/user.model";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { emailValidator } from "../../theme/utils/app-validators";
import { AppSettings } from "../../app.settings";
import { Settings } from "../../app.settings.model";
import { LoginService } from "./login.service";
import { users } from "src/app/Models/Users/users";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html"
})
export class LoginComponent {
  public form: FormGroup;
  public settings: Settings;
  validLogin: boolean = false;
  msgLogin: any;

  constructor(
    public appSettings: AppSettings,
    public fb: FormBuilder,
    public router: Router,
    private service: LoginService
  ) {
    this.settings = this.appSettings.settings;
    this.form = this.fb.group({
      email: [
        null,
        Validators.compose([Validators.required /*, emailValidator*/])
      ],
      password: [
        null,
        Validators.compose([Validators.required, Validators.minLength(4)])
      ],
      rememberMe: false
    });
  }

  public onSubmit(values: Object): void {
    if (this.form.valid) {
      this.msgLogin = "";
      let userName: string = this.form.get("email").value;
      let password: string = this.form.get("password").value;

      // this.checkLogin(userName, password);
      console.log("userName=" + userName + "   password=" + password);
      // let dd:boolean=this.checkLogin(userName, password);
      // console.log("valid=" + this.validLogin+"   dd="+dd);
      //this.service.getLogin(userName, password);
   /*   this.service.getUser(userName, password).subscribe(res => {
        console.log(res);
        if (res != null) {
          localStorage.setItem("token", JSON.stringify(res));
          // let data = (JSON.parse(localStorage.getItem('token'))) as users;
          // this.service.sUserId = data.id;
          // this.service.sSchoolId = data.schoolId;
          // this.service.sSchoolName = data.schoolName;
          // console.log(this.service.sSchoolName);
          this.router.navigate(["../admissions/index"]);
        } else {
        this.msgLogin = "يرجى التحقق من إسم المستخدم أو كلمة المرور";
          return;
        }
      });
*/
      this.service.login(userName, password);
      //let data = JSON.parse(localStorage.getItem("token")) as users;
      //console.log("----");
      //console.log(data);
      console.log("compo1:" + this.service.sSchoolName);
      if (this.service.sUserId  != null) {
        // this.service.sUserId = data.id;
        // this.service.sSchoolId = data.schoolId;
        // this.service.sSchoolName = data.schoolName;
        this.router.navigate(["../admissions/index"]);

      } else {
        this.service.sUserId = null;
        this.msgLogin = "يرجى التحقق من إسم المستخدم أو كلمة المرور";
        return;
      }
    }
  }

  ngAfterViewInit() {
    this.settings.loadingSpinner = false;
  }

  //check Api Login

  checkLogin(userName: any, password: any): boolean {
    var my_object: users;
    this.service.getUser(userName, password).subscribe(
      res => {
        if (res == null) return;
        localStorage.setItem("token", JSON.stringify(res));
        var data = localStorage.getItem("token");
        //this.user = data ;
        my_object = JSON.parse(localStorage.getItem("token")) as users;
        var xx = my_object.schoolName;
        // console.log("xx=" + xx);
        // console.log(my_object);
        // console.log( data);
      },
      error => console.log("error"),
      () => {
        console.log("complite");
      }
    );

    let ob = JSON.parse(localStorage.getItem("token")) as users;
    this.service.sLoginData = JSON.parse(
      localStorage.getItem("token")
    ) as users;
    let yy = ob.schoolName;
    // console.log("yy=" + yy);
    return true;
  }
}
