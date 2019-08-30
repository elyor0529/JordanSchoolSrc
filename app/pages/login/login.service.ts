import { users } from "./../../Models/Users/users";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";
import { CookieManagerService } from "src/app/shared/services/cookie-manager.service";
import { map } from "rxjs/internal/operators/map";
import { Menu } from 'src/app/theme/components/menu/menu.model';
@Injectable({
  providedIn: "root"
})
export class LoginService {
  public sUserId: any;
  public sSchoolId: any;
  public sSchoolName: any;
  public sLoginData: any;

  private apiUrl = environment.apiBaseUrl + "Users/checkLogin";
  private menuApiUrl = environment.apiBaseUrl + "Users/GetUserMenu";

  tokenCookieName = '_t';

  constructor(private http: HttpClient,
    private cookieManagerService: CookieManagerService) { }

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
          this.cookieManagerService.setCookie(this.tokenCookieName, result.token, 2);
          console.log(" tokenCookieName="+this.tokenCookieName);
          return true;
        })
      );
  }

  login(userName: string, password: string) {
    this.getUser(userName, password).subscribe(res => {
      // console.log(res);
      if (res != null) {
        const result ="";
        this.cookieManagerService.getCookie("new");
        console.log(" tokenCookieName=" + this.tokenCookieName);
        
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

  
  getUserMenu(userId): Observable<Menu> {
    return this.http.get<Menu>(`${this.menuApiUrl}/${userId}`,environment.httpOptions);
  }
  
  /*

       localStorage.setItem ( 'token' , result.token );
  localStorage.removeItem ( 'token');

to get token 
var data=localStorage.getItem ( 'token' );
*/
}
