import { users } from "./../../Models/Users/users";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";
import { CookieManagerService } from "src/app/shared/services/cookie-manager.service";
import { map } from "rxjs/internal/operators/map";
@Injectable({
  providedIn: "root"
})
export class LoginService {
  public sUserId: any;
  public sSchoolId: any;
  public sSchoolName: any;
  public sLoginData: any;

  private apiUrl = environment.apiBaseUrl + "Users/checkLogin";
  constructor(private http: HttpClient) {}

  getUser(userName: string, password: string): Observable<users> {
    return this.http.get<users>(
      `${this.apiUrl}/${userName}/${password}`,
      environment.httpOptions
    );
  }

  getLogin(userName: string, password: string) {
    console.log("=====GetLogin Service");

    return this.http
      .get(`${this.apiUrl}/${userName}/${password}`, environment.httpOptions)
      .pipe(
        map((response: any) => {
          const result = response;
          console.log(result);
          console.log(result.token);
          console.log("------");
          if (result.token === "") {
            return false;
          }
          console.log(result);
          console.log(result.token);
          localStorage.setItem("token", result.token);
          // const decodedJwtData = result.token;
          //  this.loginService. = decodedJwtData;
          // this.cookieManagerService.setCookie(this.tokenCookieName, result.token, 2);
          return true;
        })
      );
  }

  login(userName: string, password: string) {
    this.getUser(userName, password).subscribe(res => {
      // console.log(res);
      if (res != null) {
        localStorage.setItem("token", JSON.stringify(res));
      }
    });

    let data = JSON.parse(localStorage.getItem("token")) as users;

    if (data != null) {
      this.sUserId = data.id;
      this.sSchoolId = data.schoolId;
      this.sSchoolName = data.schoolName;
    }
   // console.log("login:" + this.sSchoolName);
  }
  /*

       localStorage.setItem ( 'token' , result.token );
  localStorage.removeItem ( 'token');

to get token 
var data=localStorage.getItem ( 'token' );
*/
}
