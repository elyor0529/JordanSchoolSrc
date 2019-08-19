import { LkpLookupType } from './../../Models/Lookups/lkplookuptype';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LookupTypeApiService {

  apiUrl=environment.apiBaseUrl + 'LkpLookupType';
  
  constructor(private http: HttpClient) { }

  LookupTypes():Observable<LkpLookupType[]>{
    return this.http.get<LkpLookupType[]>(this.apiUrl, environment.httpOptions );

  } 

  




}
