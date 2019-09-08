
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
export class ClassService {

  public sSchoolId = null;
  

  private apiUrl = environment.apiBaseUrl + 'LkpClass';
  constructor(private http:HttpClient) { }

  classList():Observable<lkpClass[]>{
    return this.http.get<lkpClass[]>(this.apiUrl, environment.httpOptions);
   
  }
  GetClassBySchool(schoolId): Observable<lkpClass[]>{
    return this.http.get<lkpClass[]>(`${this.apiUrl + "/GetClassBySchool"}/${schoolId}`,
      environment.httpOptions)
      .pipe(
        map(response => response),
        catchError((e: any) =>{ console.log("erorrrrrrrrs");
          //do your processing here
          return throwError(e);
         // return Observable.throw;
        }),
      );      

  }


  GetClassBySection(sectionId): Observable<lkpClass[]>{
    return this.http.get<lkpClass[]>(`${this.apiUrl + "/GetClassBySection"}/${sectionId}`,
      environment.httpOptions)
      .pipe(
        map(response => response),
        catchError((e: any) =>{ console.log("erorrrrrrrrs");
          //do your processing here
          return throwError(e);
         // return Observable.throw;
        }),
      );      

  }

  
  addClass(model: lkpClass):Observable<lkpClass>{
    return this.http.post<lkpClass>(this.apiUrl,model,environment.httpOptions);
  }

  deleteClass(id:number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`,environment.httpOptions)
  }
  updateClass(id:number, model:lkpClass):Observable<void>{
    return this.http.put<void>(`${this.apiUrl}/${id}`,model,environment.httpOptions);
  }
getClass(id:number):Observable<lkpClass>{
return this.http.get<lkpClass>(`${this.apiUrl}/${id}`,environment.httpOptions);
}

}
