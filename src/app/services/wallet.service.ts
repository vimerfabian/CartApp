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

  isCardValid() {
    return this.httpClient.get(environment.apiUrl + '/isvalid');
  }

  getCardType() {
    return this.httpClient.get(environment.apiUrl + '/getcardtype');
  }
}
