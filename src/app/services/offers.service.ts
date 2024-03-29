import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OffersService {
  url: string;
  constructor(private httpClient: HttpClient) {
    this.url = environment.apiUrl + '/offer';
  }

  getList() {
    const path = '/getavailable'; //'/getoffer'; //'/getavailable'
    return this.httpClient.get<any[]>(this.url + path);
  }
}
