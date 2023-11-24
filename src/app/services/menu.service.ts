import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  url: string;
  categoryUrl: string;
  productUrl: string;
  constructor(private httpClient: HttpClient) {
    this.url = environment.apiUrl + '/menu';
    this.categoryUrl = environment.apiUrl + '/category';
    this.productUrl = environment.apiUrl + '/product';
  }

  getList() {
    return this.httpClient.get<any[]>(this.url + '/getoffer');
  }
  getCategoryList() {
    return this.httpClient.get<any[]>(this.categoryUrl + '/getcategorylist');
  }

  getCategoryList1() {
    return this.httpClient
      .get<any[]>(this.categoryUrl + '/getcategorylist')
      .subscribe(
        (data) => {
          console.log('Menu', data);
        },
        (error) => {
          console.error('Error obteniendo claims', error);
        }
      );
  }

  getProduct(id: number) {
    return this.httpClient.get<any[]>(
      this.productUrl + `/getproductbyid?id=${id}`
    );
  }
}
