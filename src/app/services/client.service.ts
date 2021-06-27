import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
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

}
