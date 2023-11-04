import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './auth/interceptor/token-interceptor';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { ComponentsModule } from './components/components.module';
import { Stripe } from '@ionic-native/stripe/ngx';
import { PayPal } from '@ionic-native/paypal/ngx';
import { NgxPayPalModule } from 'ngx-paypal';
import { Uid } from '@ionic-native/uid/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Device } from '@awesome-cordova-plugins/device/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ComponentsModule,
    NgxPayPalModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    Storage,
    Stripe,
    PayPal,
    Uid,
    AndroidPermissions,
    Device,
    LocalNotifications,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
