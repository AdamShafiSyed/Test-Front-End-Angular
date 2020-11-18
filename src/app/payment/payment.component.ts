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
pastDate: boolean;
  constructor(private fb: FormBuilder, private paymentService: PaymentService) { }

  ngOnInit(): void {
    this.paymentForm = this.fb.group({
      creditCardNumber: ['', Validators.required],
      cardholder: ['', Validators.required],
      expirationDate: ['', Validators.required],
      securityCode: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(3)])],
      amount: ['', Validators.compose([Validators.required, Validators.min(1)])]
    });

    this.paymentForm.controls['expirationDate'].setValue(null)
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

  ngOnDestroy(): void {
    sessionStorage.clear();
  }

  dateSelected(event: { target: { value: string; } }): void {
    let dateStrings = event.target.value.split('-');
    let date = new Date(+dateStrings[0], +dateStrings[1]-1, +dateStrings[2]);
    if(date.getTime() <= new Date().getTime()) {
      this.pastDate = true;
    } else {
      this.pastDate = false;
    }
  }

}
