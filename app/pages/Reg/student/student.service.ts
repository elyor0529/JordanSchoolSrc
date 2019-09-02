
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

  export class StudentService {


     apiUrl= environment.apiBaseUrl+"AdmStud";

  private url = environment.apiBaseUrl + "Users";
  
    constructor(private http:HttpClient){}


    getUsers(): Observable<users> {
      return this.http.get<users>(this.url, environment.httpOptions);
  }
getStudentList():Observable<Student>{
    return this.http.get<Student>(this.apiUrl,environment.httpOptions);
    }
    
addStudent(model:Student):Observable<Student>{
    return this.http.post<Student>(this.apiUrl,model,environment.httpOptions);
}

updateStudent(id:number, model:Student):Observable<void>{
  return this.http.put<void>(`${this.apiUrl}/${id}`,model,environment.httpOptions);
}
deleteStudnt(id:number):Observable<void>{
  return this.http.delete<void>(`${this.apiUrl}/${id}`,environment.httpOptions);
}


getParent(id:number):Observable<regParents>{
  return this.http.get<regParents>(`${this.apiUrl+"/Detail"}/${id}`,environment.httpOptions);
}

/*
getStudent(id:number):Observable<Student[]>{
  return this.http.get<Student[]>(`${this.apiUrl}/${id}`,environment.httpOptions);
  }
*/
  
  getStudent(id:number): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/${id}`, environment.httpOptions);
  }
  
  


      
  }