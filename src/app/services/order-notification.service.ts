import { Injectable } from '@angular/core';
import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { OrderService } from './order.service';
import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderNotificationService {
  private lastOrderStates: any = {};
  private ordersListSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]); 

  constructor(
    private localNotifications: LocalNotifications,
    private backgroundMode: BackgroundMode,
    private orderService: OrderService,
    private authService: AuthService
  ) {}

  startBackgroundTask() {
    this.backgroundMode.enable();
    setInterval(async () => {
      await this.checkOrderStatuses();
    }, 10000); 
  }

  private async checkOrderStatuses() {
    const user = this.authService.getCurrentSession();
    if (!user?.idClient) return;

    try {
      const orders: any = await this.orderService.getList(user.idClient).toPromise();
      const ordersArray = Array.isArray(orders) ? orders : orders.data || [];
      this.ordersListSubject.next(ordersArray);

      let changesDetected = false;

      ordersArray.forEach(order => {
        const lastState = this.lastOrderStates[order.id];
        if (lastState && lastState !== order.tracking) {

          console.log('El estado de la orden a cambiado');

          this.localNotifications.schedule({
            id: order.id,
            title: 'Order Status Changed',
            text: `Your order #${order.id} has changed status to ${order.tracking}`,
            trigger: { at: new Date(new Date().getTime() + 1000) },
            sound: 'file://sound.mp3',
            priority: 2,
          });
          changesDetected = true;
        }
        this.lastOrderStates[order.id] = order.tracking;
      });

      if (!changesDetected) {
        console.log('Ninguna orden a cambiado de estado');
      }

    } catch (error) {
      console.error('Error checking order statuses', error);
    }
  }

  getOrdersList() {
    return this.ordersListSubject.asObservable();
  }
}
