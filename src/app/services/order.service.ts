import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private url: string;
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {
    this.url = environment.apiUrl + '/Order';
  }

  saveOrder(order: any) {
    const user = this.authService.getCurrentSession();
    order.idClient = user?.idClient;
    const url = this.url + `/saveorder`;
    console.log('saving order', order);
    return this.httpClient.post(url, order);
  }

  getList(clientId: number | string) {
    const url = this.url + `/getorderbyclient?id=${clientId}`;
    console.log('url', url);
    return this.httpClient.get(url);
  }
}
