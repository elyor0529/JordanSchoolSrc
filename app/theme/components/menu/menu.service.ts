import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Location } from "@angular/common";

import { Menu } from "./menu.model";
import { verticalMenuItems, horizontalMenuItems, y } from "./menu";

import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class MenuService {


  private apiUrl = environment.apiBaseUrl + "Users/GetUserMenu";
  
 
  xhorizontalMenuItems: Menu[]=[];
  constructor(
    private location: Location,
    private router: Router,
    private http: HttpClient
  ) {

    this.apiUrl = environment.apiBaseUrl + "Users/GetUserMenu";

   

  }

  heroes : Menu[];
  x: any;
  public verticalMenuItems : Menu[];

  public getVerticalMenuItems(): Array<Menu> {
    
    let verticalMenuItems = JSON.parse(localStorage.getItem("MenuToken")) as Menu[];
    return verticalMenuItems;
   
   
    
    // let xxx = [
    //   { id: 500, title:'  xxx  القبول ', routerLink:'', href:null, icon:'folder_shared', target:null, hasSubMenu:true, parentId:0}
      
  
    // ]

    // let yy = [ new Menu (430, '  المالية', '', null, 'money',  null, true, 0),
    //   new Menu(444, 'yyyyy', '', null, 'money', null, true, 430)]
    
    //  let y = [new Menu (  1,  "xxxx",  "",  "",  "folder_shared",  "",  true,  0 )
    //   , new Menu(2, "yyyyy", "/admissions/index", "", "folder_shared", "", false, 1)]
    // return y;
    //  let x = this.getUserMenu("2").subscribe(res => {
    //   // this.verticalMenuItems = res;
    //   // console.log(res);
    //    let y = [new Menu(1, "yyyyyx", "", "", "folder_shared", "", true, 0)];
    //     return y;
    //   //  res.forEach((element: Menu) => { 

         
    //   //  }
         
    //    return this.verticalMenuItems;
    //  },
    //    err => { console.log("error") },
    //    () => { console.log("Complite");}
    // );

    //  let yy = [ new Menu (430, '  المالية', '', null, 'money',  null, true, 0),
    //    new Menu(444, 'yyyyy', '', null, 'money', null, true, 430)]
    
    // return yy;
    // console.log(xxx);
    // this.verticalMenuItems = y;
   // console.log("------------");
    //console.log(this.heroes);
  //  return this.verticalMenuItems // this.verticalMenuItems;// this.verticalMenuItems;
    // return this.getUserMenu(2).subscribe(
    //   res => (this.xhorizontalMenuItems = res)
    // );

     
  }

  public getHorizontalMenuItems(): Array<Menu> {
    return horizontalMenuItems;
  }

  getUserMenu(userId): Observable<Menu> {
    return this.http.get<Menu>(`${this.apiUrl}/${userId}`,environment.httpOptions);
  }

  public expandActiveSubMenu(menu: Array<Menu>) {
    let url = this.location.path();
    let routerLink = url; // url.substring(1, url.length);
    let activeMenuItem = menu.filter(item => item.routerLink === routerLink);
    if (activeMenuItem[0]) {
      let menuItem = activeMenuItem[0];
      while (menuItem.parentId != 0) {
        let parentMenuItem = menu.filter(
          item => item.id == menuItem.parentId
        )[0];
        menuItem = parentMenuItem;
        this.toggleMenuItem(menuItem.id);
      }
    }
  }

  public toggleMenuItem(menuId) {
    let menuItem = document.getElementById("menu-item-" + menuId);
    let subMenu = document.getElementById("sub-menu-" + menuId);
    if (subMenu) {
      if (subMenu.classList.contains("show")) {
        subMenu.classList.remove("show");
        menuItem.classList.remove("expanded");
      } else {
        subMenu.classList.add("show");
        menuItem.classList.add("expanded");
      }
    }
  }

  public closeOtherSubMenus(menu: Array<Menu>, menuId) {
    let currentMenuItem = menu.filter(item => item.id == menuId)[0];
    if (currentMenuItem.parentId == 0 && !currentMenuItem.target) {
      menu.forEach(item => {
        if (item.id != menuId) {
          let subMenu = document.getElementById("sub-menu-" + item.id);
          let menuItem = document.getElementById("menu-item-" + item.id);
          if (subMenu) {
            if (subMenu.classList.contains("show")) {
              subMenu.classList.remove("show");
              menuItem.classList.remove("expanded");
            }
          }
        }
      });
    }
  }

  public closeAllSubMenus() {
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
}
