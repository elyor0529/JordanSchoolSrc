
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { users } from 'src/app/Models/Users/users';

@Injectable({
    providedIn: 'root' 
  })

  export class userRoleService {

    private url = environment.apiBaseUrl + "UserRole";

    //apiUrl= environment.apiBaseUrl+"AdmStud";

    constructor(public http:HttpClient) { }
    
    addUser(user:users){	    
        return this.http.post(this.url, user, environment.httpOptions);
    }

    getUserById(id: number){	    
        return this.http.get(`${this.url}/${id}`, environment.httpOptions);
    }

    updateUser(id: number, user:users){
        return this.http.put(`${this.url}/${id}`, user, environment.httpOptions);
    }

    deleteUser(id: number) {
        return this.http.delete(`${this.url}/${id}`, environment.httpOptions);
    }     
    
    getRoleList(){	    
        return this.http.get(this.url+"/Roles", environment.httpOptions);
    }
  }