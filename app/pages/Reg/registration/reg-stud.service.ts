import { regParents } from '../../../Models/Reg/Parents/reg-parents';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StudReg } from 'src/app/Models/Reg/YearlyStudReg/StudReg';




@Injectable({
    providedIn: 'root'
  })

  export class RegStudService {


     apiUrl= environment.apiBaseUrl+"YearlyStudReg";

    constructor(private http:HttpClient){}


    getParentsList():Observable<regParents[]>{

    return this.http.get<regParents[]>(this.apiUrl,environment.httpOptions);
    }

   getParentChildrens(id):Observable<StudReg[]>{
  return this.http.get<StudReg[]>(`${this.apiUrl+"/GetParentChildrens"}/${id}`,environment.httpOptions);
  }
  
  ConfirmStudReg(id,year,classId, newClassId):Observable<number>{
    return this.http.get<number>(`${this.apiUrl+"/ConfirmStudReg"}/${id}/${year}/${classId}/${newClassId}`,environment.httpOptions);
  }


      
  }