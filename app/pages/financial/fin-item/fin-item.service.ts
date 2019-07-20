import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FinItem } from 'src/app/Models/financial/fin-item';

@Injectable({
  providedIn: 'root'
})
export class FinItemService {
  private apiUrl = environment.apiBaseUrl + 'FinItem';

  constructor(private http: HttpClient) { }
 

  getFinItemList(): Observable<FinItem[]> {
    return this.http.get<FinItem[]>(this.apiUrl, environment.httpOptions);
  }

  getFinItemById(id: number): Observable<FinItem> {
    return this.http.get<FinItem>(`${this.apiUrl}/${id}`, environment.httpOptions);
  }

  addFinItem(model: FinItem): Observable<FinItem> {
    return this.http.post<FinItem>(this.apiUrl, model, environment.httpOptions);
  }

  deleteFinItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, environment.httpOptions)
  }

  updateFinItem(id:number, model:FinItem):Observable<void>{
    return this.http.put<void>(`${this.apiUrl}/${id}`,model,environment.httpOptions);
  }


}
