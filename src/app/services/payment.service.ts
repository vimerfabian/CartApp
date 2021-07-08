import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private url: string;
  constructor(private http: HttpClient) {
    this.url = environment.apiPaymentUrl;
  }

  pay(data) {
    const url = `${this.url + '/stripe/pay'}`;
    console.log('sending data', data);
    return this.http.post(url, data);
  }
}
