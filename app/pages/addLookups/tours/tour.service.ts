import { lkpTour } from './../../../Models/addLookups/tours/lkpTour';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TourService {


  private apiUrl = environment.apiBaseUrl + 'LkpTour';
  
constructor(private http: HttpClient) { }

tourList():Observable<lkpTour[]>{
  return this.http.get<lkpTour[]>(this.apiUrl,environment.httpOptions);
}
addTour(model: lkpTour):Observable<lkpTour>{
  return this.http.post<lkpTour>(this.apiUrl,model,environment.httpOptions);
}

deleteTour(id:number):Observable<void>{
  return this.http.delete<void>(`${this.apiUrl}/${id}`,environment.httpOptions)
}
updateTour(id:number, model:lkpTour):Observable<void>{
  return this.http.put<void>(`${this.apiUrl}/${id}`,model,environment.httpOptions);
}
getTour(id:number):Observable<lkpTour>{
return this.http.get<lkpTour>(`${this.apiUrl}/${id}`,environment.httpOptions);
}

}
