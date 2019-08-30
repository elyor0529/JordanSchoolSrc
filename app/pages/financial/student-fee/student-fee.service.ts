import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { StudentFee } from "src/app/Models/financial/student-fee";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class StudentFeeService {
  private apiUrl = environment.apiBaseUrl + "StudentFee";
  public selectedParentId:any;
  public selectedYearId:any;
  constructor(private http: HttpClient) {}

  getStudentFeeList(): Observable<StudentFee[]> {
    return this.http.get<StudentFee[]>(this.apiUrl, environment.httpOptions);
  }

  GetStudFeesListByParent(yearId,id: number): Observable<StudentFee[]> {
    return this.http.get<StudentFee[]>(
      `${this.apiUrl + "/GetStudFeesListByParent"}/${yearId}/${id}`,
      environment.httpOptions
    );
  }

  GetStudFeesDtl(yearId, studId): Observable<StudentFee[]> {
    return this.http.get<StudentFee[]>(
      `${this.apiUrl + "/GetStudFeesDtl"}/${yearId}/${studId}`,
      environment.httpOptions
    );
  }

  addStudentFee(model: StudentFee): Observable<StudentFee> {
    return this.http.post<StudentFee>(
      this.apiUrl,
      model,
      environment.httpOptions
    );
  }

  deleteStudentFee(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`,
      environment.httpOptions
    );
  }

  updateStudentFee(id: number, model: StudentFee): Observable<void> {
    return this.http.put<void>(
      `${this.apiUrl}/${id}`,
      model,
      environment.httpOptions
    );
  }


  getStudentFeeById(id: number): Observable<StudentFee> {
    return this.http.get<StudentFee>(`${this.apiUrl}/${id}`, environment.httpOptions);
  }

}
