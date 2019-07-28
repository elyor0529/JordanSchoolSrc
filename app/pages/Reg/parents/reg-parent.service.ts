import { regParents } from './../../../Models/Reg/Parents/reg-parents';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';




@Injectable({
    providedIn: 'root'
  })

  export class RegParentService {


     apiUrl= environment.apiBaseUrl+"RegParent";

    constructor(private http:HttpClient){}


    getParentsList():Observable<regParents[]>{

    return this.http.get<regParents[]>(this.apiUrl,environment.httpOptions);
    }
    
addParent(model:regParents):Observable<regParents>{
    return this.http.post<regParents>(this.apiUrl,model,environment.httpOptions);
}

updateParent(id:number, model:regParents):Observable<void>{
  return this.http.put<void>(`${this.apiUrl}/${id}`,model,environment.httpOptions);
}
deleteParent(id:number):Observable<void>{
  return this.http.delete<void>(`${this.apiUrl}/${id}`,environment.httpOptions);
}


getParent(id:number):Observable<regParents>{
  return this.http.get<regParents>(`${this.apiUrl+"/Detail"}/${id}`,environment.httpOptions);
}


getParentById(id:number):Observable<regParents[]>{
  return this.http.get<regParents[]>(`${this.apiUrl}/${id}`,environment.httpOptions);
  }


      
  }