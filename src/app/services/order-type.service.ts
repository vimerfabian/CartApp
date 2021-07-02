import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderTypeService {
  private url: string;
  constructor(private httpClient: HttpClient) {
    this.url = environment.apiUrl + '/OrderType';
  }


  getList() {
    const url = this.url + `/getordertype`;
    return this.httpClient.get(url);
  }
}
