import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Payment } from 'src/app/Models/financial/payment';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {




  private apiUrl = environment.apiBaseUrl + 'Payment';
  public selectedParentId:any;
  public selectedYearId:any;
  private parenetIdParam=new BehaviorSubject('');
  
  constructor(private http:HttpClient) { }



  getPaymentList(){
   return this.http.get<Payment[]>(this.apiUrl,environment.httpOptions);
  }


  getByParentIdYearId() {
    return this.http.get<Payment[]>(this.apiUrl,environment.httpOptions);
  }

  
  getPaymentById(id: number): Observable<Payment> {
    return this.http.get<Payment>(`${this.apiUrl}/${id}`, environment.httpOptions);
  }

  addPayment(model: Payment): Observable<Payment> {
    return this.http.post<Payment>(this.apiUrl, model, environment.httpOptions);
  }

  deletePayment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, environment.httpOptions)
  }

  updatePayment(id:number, model:Payment):Observable<void>{
    return this.http.put<void>(`${this.apiUrl}/${id}`,model,environment.httpOptions);
  }

 



}
