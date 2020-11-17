import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PaymentService } from '../services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
minDate = this.getMinDate().toString();
maxDate = new Date();
paymentForm: FormGroup;
  constructor(private fb: FormBuilder, private paymentService: PaymentService) { }

  ngOnInit(): void {
    this.paymentForm = this.fb.group({
      creditCardNumber: ['', Validators.required],
      cardholder: ['', Validators.required],
      expirationDate: ['', Validators.required],
      securityCode: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(3)])],
      amount: ['', Validators.compose([Validators.required, Validators.min(1)])]
    });

    this.paymentForm.controls['expirationDate'].setValue(this.getMinDate().toString())
  }

  doPayment(): void {
    this.paymentService.payment(this.paymentForm.value).subscribe(res => {
      // console.log('res', res);
      this.paymentForm.reset();
    });
  }

  getMinDate(): string {
    return new Date().getFullYear() + "-" + new Date().getMonth() + "-" + new Date().getDate();
  }

  ngOnDestroy() {
    sessionStorage.clear();
  }

}
