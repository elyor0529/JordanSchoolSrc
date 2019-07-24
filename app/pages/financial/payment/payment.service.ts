import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Payment } from 'src/app/Models/financial/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl = environment.apiBaseUrl + 'Payment';

  constructor(private http:HttpClient) { }



  getPaymentList(){
   return this.http.get<Payment[]>(this.apiUrl,environment.httpOptions);
  }
}
