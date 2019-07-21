import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { LkpYear } from 'src/app/Models/addLookups/year/LkpYear';

@Injectable({
  providedIn: 'root'
})
export class YearService {


  private apiUrl = environment.apiBaseUrl +'LkpYear';

  constructor(private http:HttpClient) { }

  getYearsList(){
    return this.http.get<LkpYear[]>(this.apiUrl,environment.httpOptions);
  }
}
