import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private url: string;
  constructor(private httpClient: HttpClient) {
    this.url = environment.apiUrl + '/Client';
  }

  save(client) {
    const path = '/saveclient';
    return this.httpClient.post(this.url + path, client);
  }

  get(id: number) {
    const path = '/getclientbyid?id=' + id;
    const url = `${this.url}${path}`;
    console.log('uurl', url);
    return this.httpClient.get(url.trim().toString());
  }
}
