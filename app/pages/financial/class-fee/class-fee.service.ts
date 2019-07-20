import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ClassFee } from 'src/app/Models/financial/class-fee';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClassFeeService {
  private apiUrl = environment.apiBaseUrl + 'ClassFee';

  constructor(private http: HttpClient) { }


  getClassFeeList(): Observable<ClassFee[]> {
    return this.http.get<ClassFee[]>(this.apiUrl, environment.httpOptions);
  }

  getClassFeeById(id: number): Observable<ClassFee> {
    return this.http.get<ClassFee>(`${this.apiUrl}/${id}`, environment.httpOptions);
  }

  addClassFee(model: ClassFee): Observable<ClassFee> {
    return this.http.post<ClassFee>(this.apiUrl, model, environment.httpOptions);
  }

  deleteClassFee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, environment.httpOptions)
  }

  updateClassFee(id:number, model:ClassFee):Observable<void>{
    return this.http.put<void>(`${this.apiUrl}/${id}`,model,environment.httpOptions);
  }


}
