import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  url: string;
  categoryUrl: string;
  constructor(private httpClient: HttpClient) {
    this.url = environment.apiUrl + '/menu';
    this.categoryUrl = environment.apiUrl + '/category';
  }

  getList() {
    return this.httpClient.get<any[]>(this.url + '/getoffer');
  }
  getCategoryList() {
    return this.httpClient.get<any[]>(this.categoryUrl + '/getcategorylist');
  }
}
