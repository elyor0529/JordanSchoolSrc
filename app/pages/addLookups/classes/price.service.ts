import { ClassesPrice } from './../../../Models/addLookups/classes/classesPrice';

import { Observable, pipe, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from 'src/environments/environment';
import { throwMatDialogContentAlreadyAttachedError } from '@angular/material';
import { lkpClass } from 'src/app/Models/addLookups/classes/lkpClass';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PriceService {

  public sSchoolId = null;
  

  private apiUrl = environment.apiBaseUrl + 'LkpClassFees';
  constructor(private http:HttpClient) { }

  priceList():Observable<ClassesPrice[]>{
    return this.http.get<ClassesPrice[]>(this.apiUrl, environment.httpOptions);
   
  }
  

  
  addClass(model: ClassesPrice):Observable<ClassesPrice>{
    return this.http.post<ClassesPrice>(this.apiUrl,model,environment.httpOptions);
  }

  deleteClass(id:number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`,environment.httpOptions)
  }
  updateClass(id:number, model:ClassesPrice):Observable<void>{
    return this.http.put<void>(`${this.apiUrl}/${id}`,model,environment.httpOptions);
  }
getClass(id:number, yearId):Observable<ClassesPrice>{
return this.http.get<ClassesPrice>(`${this.apiUrl+"/GetByPriceByClassId"}/${id}/${yearId}`,environment.httpOptions);
}

}
