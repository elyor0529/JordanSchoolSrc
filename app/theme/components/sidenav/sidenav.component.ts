import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";
import { AppSettings } from "../../../app.settings";
import { Settings } from "../../../app.settings.model";
import { MenuService } from "../menu/menu.service";
import { LoginService } from "src/app/pages/login/login.service";
import { users } from "src/app/Models/Users/users";
import { DomSanitizer } from "@angular/platform-browser";
import { SchoolService } from "src/app/pages/addLookups/schools/school.service";

@Component({
  selector: "app-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.scss"],
  encapsulation: ViewEncapsulation.None,
  providers: [MenuService]
})
export class SidenavComponent implements OnInit {
  public psConfig: PerfectScrollbarConfigInterface = {
    wheelPropagation: true
  };
  public menuItems: Array<any>;
  public settings: Settings;
  image: any;

  constructor(
    public appSettings: AppSettings,
    public menuService: MenuService,
    private loginService: LoginService,
    private schoolService: SchoolService,
    private sanitizer: DomSanitizer
  ) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {
    this.login();
    this.menuItems = this.menuService.getVerticalMenuItems();
  }

  ngDoCheck() {
    if (this.settings.fixedSidenav) {
      if (this.psConfig.wheelPropagation == true) {
        this.psConfig.wheelPropagation = false;
      }
    } else {
      if (this.psConfig.wheelPropagation == false) {
        this.psConfig.wheelPropagation = true;
      }
    }
  }

  public closeSubMenus() {
    let menu = document.getElementById("vertical-menu");
    if (menu) {
      for (let i = 0; i < menu.children[0].children.length; i++) {
        let child = menu.children[0].children[i];
        if (child) {
          if (child.children[0].classList.contains("expanded")) {
            child.children[0].classList.remove("expanded");
            child.children[1].classList.remove("show");
          }
        }
      }
    }
  }

  schoolName: any;
  currentYear: any;
  login() {
    let data = JSON.parse(localStorage.getItem("token")) as users;
    this.schoolName = data.schoolName;
    this.currentYear = data.yearName;
    let id = data.schoolId;
    this.schoolService.getSchool(id).subscribe(res => {
      let objectURL = "data:image/jpeg;base64," + res.imageFile;
      this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    });
  }
}
