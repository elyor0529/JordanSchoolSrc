import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PaymentChequeService } from '../payment-cheque.service';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss']
})
export class PaymentFormComponent implements OnInit {

  public formGroup: FormGroup;
  constructor(private fb: FormBuilder,
  private service:PaymentChequeService) { }

  ngOnInit() {
    this.initForm();
  }

  
  initForm() {
    this.formGroup = this.fb.group(
      {
        id: [0],
        paymentId: [580],
        chequeNo: [],
        chequeDate: [],
        chequeValue: [],
        bankId: [1]
        
      });
  }
  
  submit() { }
  

  addCheque() {
    
    this.service.addPaymentCheque(this.formGroup.value).subscribe(
      res => {
       // console.log(this.checkoutForm.value)
      },
      err => console.log(err)
    );
  }
}
