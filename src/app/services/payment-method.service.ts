import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {
  private url: string;
  constructor(private httpClient: HttpClient) {
    this.url = environment.apiUrl + '/PaymentMethod';
  }

  getList(clientId: number | string) {
    const url = this.url + `/getpaymentmethod?id=${clientId}`;
    return this.httpClient.get(url);
  }
}
