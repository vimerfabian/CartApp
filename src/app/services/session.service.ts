import { Injectable } from '@angular/core';
import { StorageEnum } from '../common/enums/storage.enum';
import { IDeviceInfo } from '../models/device-info';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor() {}

  setDeviceInfo(di: IDeviceInfo) {
    localStorage.setItem(StorageEnum.DEVICE_INFO, JSON.stringify(di));
  }

  getDeviceInfo() {
    return JSON.parse(
      localStorage.getItem(StorageEnum.DEVICE_INFO)
    ) as IDeviceInfo;
  }
}
