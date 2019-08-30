
import { regParents } from '../../../Models/Reg/Parents/reg-parents';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Student } from 'src/app/Models/Reg/Students/students';
import { users } from 'src/app/Models/Users/users';





@Injectable({
    providedIn: 'root' 
  })

  export class SysusersService {

    private url = environment.apiBaseUrl + "Users";

    apiUrl= environment.apiBaseUrl+"AdmStud";

    constructor(public http:HttpClient) { }
    
    getUsers(): Observable<users> {
        return this.http.get<users>(this.url, environment.httpOptions);
    }

getStudentList():Observable<Student>{
    return this.http.get<Student>(this.apiUrl,environment.httpOptions);
    }
    
    getUsersList():Observable<users>{
    return this.http.get<users>(this.url,environment.httpOptions);
    } 


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
    
    
    getSchoolUser(id: number){	    
        return this.http.get(`${this.url+"GetSchoolById"}/${id}`, environment.httpOptions);
    }
  }