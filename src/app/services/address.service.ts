import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private url: string;
  constructor(private httpClient: HttpClient) {
    this.url = environment.apiUrl + '/Address';
  }


  save(client) {
    const path = '/saveaddress';
    return this.httpClient.post(this.url + path, client);
  }

  getList(clientId: number | string) {
    const url = this.url + `/getaddressbyclient?id=${clientId}`;
    return this.httpClient.get(url);
  }

  getCityList() {
    return this.httpClient.get(environment.apiUrl + '/City/getcity');
  }

  getStateList() {
    return this.httpClient.get(environment.apiUrl + '/State/getstate');
  }

  setByDefault(id: number) {
    return this.httpClient.get(this.url + `?id=${id}`);
  }
}
