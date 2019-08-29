import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { PaymentCheque } from 'src/app/Models/financial/payment-cheque';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentChequeService {
  private apiUrl = environment.apiBaseUrl + 'PaymentCheque';

  constructor(private http: HttpClient) { }


  getChequesList(): Observable<PaymentCheque> {
    return this.http.get<PaymentCheque>(this.apiUrl, environment.httpOptions)
  }

  addPaymentCheque(model: PaymentCheque): Observable<PaymentCheque> {
    return this.http.post<PaymentCheque>(this.apiUrl, model, environment.httpOptions);
  }


  getChequesListByPaymentId(paymentId: number): Observable<PaymentCheque> {
    return this.http.get<PaymentCheque>(`${this.apiUrl + "/GetByPayementId"}/${paymentId}`, environment.httpOptions);
  }



  public save(data: any, isNew: boolean): void {

    console.log('data -----------------');
    console.log(data);
     console.log('data -----------------');

    if (isNew) {
      console.log('is newwwwwwwwwwwwwwwwwwwwwwwwwww -----------------');
       this.addPaymentCheque(data);
    } else {
      this.addPaymentCheque(data);
    }
}

   
}
