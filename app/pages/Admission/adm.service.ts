import { Admission } from './../../Models/Admission/admission';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { throwMatDialogContentAlreadyAttachedError } from '@angular/material';
import { regParents } from 'src/app/Models/Reg/Parents/reg-parents';
import { AcdimicYears } from 'src/app/Models/addLookups/years/AcdimicYears';

@Injectable({
  providedIn: 'root'
})
export class AdmService {


  private apiUrl = environment.apiBaseUrl + 'AdmStud';
  private CurrentYearApiUrl = environment.apiBaseUrl + 'LkpYear';
  
  public sParentId:string;
  public sParentName:string;
  public sSelected:any;

  
  //CurrentYear
  public sCurrentYearId: any;
  public sCurrentYear: any;

  dialogData: any;
  
constructor(private http: HttpClient) { }


admissionList():Observable<Admission[]>{
  return this.http.get<Admission[]>(this.apiUrl,environment.httpOptions);
}

// getRegChildrens(id:string):Observable<regParents[]>{
//   return this.http.get<regParents[]>(`${this.apiUrl+"/RegChildrens"}/${id}`,environment.httpOptions);
// }

admInsert(model: Admission):Observable<void>{
  return this.http.post<void>(this.apiUrl,model,environment.httpOptions);
}
admUpdate(id:number,model: Admission):Observable<void>{
return this.http.put<void>(`${this.apiUrl}/${id}`,model,environment.httpOptions)
}
admDelete(id:number):Observable<void>{
  return this.http.delete<void>(`${this.apiUrl}/${id}`,environment.httpOptions);
}
getStud(id:number):Observable<Admission>{
  return this.http.get<Admission>(`${this.apiUrl}/${id}`,environment.httpOptions);
} 

  
getStudParent(id:string):Observable<regParents[]>{
  return this.http.get<regParents[]>(`${this.apiUrl+"/ParentName"}/${id}`,environment.httpOptions);
}

getByParent(id:string):Observable<Admission[]>{
  return this.http.get<Admission[]>(`${this.apiUrl+"/RegChildrens"}/${id}`,environment.httpOptions);
}
  
getByParentAndSchool(id:string, schoolId):Observable<Admission[]>{
  return this.http.get<Admission[]>(`${this.apiUrl+"/RegChildrensBySchool"}/${id}/${schoolId}`,environment.httpOptions);
}
getCurrentYear():Observable<AcdimicYears>{
  return this.http.get<AcdimicYears>(`${this.CurrentYearApiUrl+"/CurrentYear"}`,environment.httpOptions);
}
calcDescount(id:string):Observable<Admission[]>{
  return this.http.get<Admission[]>(`${this.apiUrl+"/UpdateStudSeq"}/${id}`,environment.httpOptions);
}


private messageSource = new BehaviorSubject('default message');
currentMessage = this.messageSource.asObservable();
changeMessage(message: string) {
  this.messageSource.next(message);
}

private parentIdParam = new BehaviorSubject('');
currentParentIdParam = this.parentIdParam.asObservable();
changeParentId(parentId: string) {
  this.parentIdParam.next(parentId);
}

addIssue (issue: regParents): void {
  this.dialogData = issue;
}

}
