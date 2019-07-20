import { Injectable } from '@angular/core';
import { SchoolFee } from 'src/app/Models/financial/school-fee';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SchoolFeeService {

  public selectedSchoolId:any;
  public selectedSchoolDesc:any;
  private apiUrl = environment.apiBaseUrl + 'SchoolFee';

  constructor(private http: HttpClient) { }


  getSchoolFeeList(): Observable<SchoolFee[]> {
    return this.http.get<SchoolFee[]>(this.apiUrl, environment.httpOptions);
  }

  getSchoolFeeById(id: number): Observable<SchoolFee> {
    return this.http.get<SchoolFee>(`${this.apiUrl}/${id}`, environment.httpOptions);
  }

  addSchoolFee(model: SchoolFee): Observable<SchoolFee> {
    return this.http.post<SchoolFee>(this.apiUrl, model, environment.httpOptions);
  }

  deleteSchoolFee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, environment.httpOptions)
  }

  updateSchoolFee(id:number, model:SchoolFee):Observable<void>{
    return this.http.put<void>(`${this.apiUrl}/${id}`,model,environment.httpOptions);
  }


}
