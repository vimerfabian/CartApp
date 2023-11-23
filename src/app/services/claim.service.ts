import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClaimService {
  private url: string;
  constructor(private httpClient: HttpClient) {
    this.url = environment.apiUrl + '/Claim';
  }

  save(client) {
    const path = '/saveclaim';
    return this.httpClient.post(this.url + path, client);
  }

  getClaimsByOrder(orderId: number): Observable<any[]> {
    const path = `/getbyorder?id=${orderId}`;

    return this.httpClient.get<any[]>(this.url + path);
  }
}
