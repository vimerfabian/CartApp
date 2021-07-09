import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  private url: string;
  constructor(private httpClient: HttpClient) {
    this.url = environment.apiUrl + '/PaymentMethod';
  }

  save(method) {
    const path = '/savepaymentmethod';
    return this.httpClient.post(this.url + path, method);
  }

  getList(clientId: number | string) {
    const url = this.url + `/getbyclient?id=${clientId}`;
    return this.httpClient.get(url);
  }

  isCardValid(cardNumber: string) {
    return this.httpClient.get(
      this.url + '/isvalid' + `?cardnumber=${cardNumber}`
    );
  }

  getPaymentMethodTypes() {
    return this.httpClient.get(this.url + `/getpaymentmethodtype`);
  }

  getCardType(cardNumber) {
    return this.httpClient.get(
      this.url + '/getcardtype' + `?cardnumber=${cardNumber}`
    );
  }
}
