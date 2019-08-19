import { Admission } from '../../Models/Admission/admission';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { throwMatDialogContentAlreadyAttachedError } from '@angular/material';
import { regParents } from 'src/app/Models/Reg/Parents/reg-parents';
import { AcdimicYears } from 'src/app/Models/addLookups/years/AcdimicYears';
import { StudCardData } from 'src/app/Models/Reg/Reports/StudCardData';

@Injectable({
  providedIn: 'root'
})
export class RepService {

  apiUrl = environment.apiBaseUrl + "RegStud/StudCard";
  
  constructor(private http: HttpClient) { }


  
  
  getStudCardDataVw(yearId,id):Observable<StudCardData> {
    return this.http.get<StudCardData>(`${this.apiUrl}/${yearId}/${id}`, environment.httpOptions);
  }

}
