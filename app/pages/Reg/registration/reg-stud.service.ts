import { regParents } from '../../../Models/Reg/Parents/reg-parents';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StudReg } from 'src/app/Models/Reg/YearlyStudReg/StudReg';
import { StudRegVw } from 'src/app/Models/Reg/YearlyStudReg/StudRegVw';





@Injectable({
    providedIn: 'root'
  })

  export class RegStudService {


     apiUrl= environment.apiBaseUrl+"YearlyStudReg";

    constructor(private http:HttpClient){}


    getParentsList():Observable<regParents[]>{

    return this.http.get<regParents[]>(this.apiUrl,environment.httpOptions);
    }

   getParentChildrens(parentId):Observable<StudRegVw[]>{
  return this.http.get<StudRegVw[]>(`${this.apiUrl+"/GetParentChildrensVw"}/${parentId}`,environment.httpOptions);
  }
  
  ConfirmStudReg(id,year,newClassId):Observable<number>{
    return this.http.get<number>(`${this.apiUrl+"/ConfirmStudReg"}/${id}/${year}/${newClassId}`,environment.httpOptions);
  }


      
  }