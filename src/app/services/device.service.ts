import { Injectable } from '@angular/core';
import { Uid } from '@ionic-native/uid/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Platform } from '@ionic/angular';
import { Device } from '@awesome-cordova-plugins/device/ngx';
import { IDeviceInfo } from '../models/device-info';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  constructor(
    private uid: Uid,
    private androidPermissions: AndroidPermissions,
    private device: Device,
    private platform: Platform,
    private session: SessionService
  ) {}

  async getPlatform() {
    this.platform.ready().then((ready) => {
      console.log(`serial: ${this.device.serial} | uuid: ${this.device.uuid} |  model: ${this.device.model} |
      manufacturer: ${this.device.manufacturer} | platform: ${this.device.platform} | version: ${this.device.version} |`);
      this.setDeviceInfo();
    });
    console.log('this.device', this.device);
  }
  async getMac() {
    return this.device.uuid;
  }
  async _getMac() {
    /*const { hasPermission } = await this.androidPermissions.checkPermission(
      this.androidPermissions.PERMISSION.READ_PHONE_STATE
    );

    if (!hasPermission) {
      const result = await this.androidPermissions.requestPermission(
        this.androidPermissions.PERMISSION.READ_PHONE_STATE
      );

      if (!result.hasPermission) {
        throw new Error('Permissions required');
      }

      // ok, a user gave us permission, we can get him identifiers after restart app
      return;
    }

    return this.uid.MAC;*/
  }
  getDeviceInfo() {
    let di = this.session.getDeviceInfo();
    if (!di) {
      di = this.setDeviceInfo();
    }
    return di;
  }
  setDeviceInfo() {
    const di: IDeviceInfo = {
      model: this.device.model,
      platform: this.device.platform,
      serial: this.device.serial,
      uuid: this.device.uuid,
      version: this.device.version,
      manufacturer: this.device.manufacturer,
    };
    this.session.setDeviceInfo(di);
    return di;
  }

  async getImei() {
    const { hasPermission } = await this.androidPermissions.checkPermission(
      this.androidPermissions.PERMISSION.READ_PHONE_STATE
    );

    if (!hasPermission) {
      const result = await this.androidPermissions.requestPermission(
        this.androidPermissions.PERMISSION.READ_PHONE_STATE
      );

      if (!result.hasPermission) {
        throw new Error('Permissions required');
      }

      // ok, a user gave us permission, we can get him identifiers after restart app
      return;
    }

    return this.uid.IMEI;
  }
}
