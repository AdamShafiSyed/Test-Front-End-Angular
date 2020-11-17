import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentDto } from '../models/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  payment(paymentDetails: PaymentDto): Observable<PaymentDto> {
    // console.log('paymentDetails', paymentDetails);
    return this.http.post<PaymentDto>('http://localhost:3000/payment', paymentDetails);
  }
}
