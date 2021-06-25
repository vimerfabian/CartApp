import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IMenu } from '../models/menu.interface';
@Injectable({
  providedIn: 'root'
})
export class ComponentsService {

  constructor(private httpClient: HttpClient) { }

  getMenuOptions() {
    return this.httpClient.get<IMenu[]>('/assets/data/menu.json');
  }

}
