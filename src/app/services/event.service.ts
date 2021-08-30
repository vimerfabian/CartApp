import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private url: string;
  constructor(private httpClient: HttpClient) {
    this.url = environment.apiUrl + '/Event';
  }

  getList() {
    const path = '/getavailable'; //`/getevent`
    const url = this.url + path;
    return this.httpClient.get(url);
  }
}
