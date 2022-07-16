// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'https://api.tierracolombianarestaurant-cartapp.com/api',
  stripeApiKey:
    'pk_test_51ITz8UKtCaSqT32ksXfKyKy19ngw43ZqOUlBKyQw0YRMBJYNe7ROKDLGPaHGsJoh4599e0pVYAJwnpvMQjymWkg1009XQQuv7y',
  apiPaymentUrl: 'http://192.168.100.2:3000',
  /*paypalClientId:
    'AfPDnX60nkAXLFwmapFoBgu5K9j1lvQZZ2OB1-pbyaSTz_TZ5GCz0RVEI0KgUuTD9sU39DsEoAG94izF',*/
  paypalClientId:
    'AW8LWPhEv8Qd2aMqtU9yib5LoG0gTCSEAtanwOPFSzHQ_je1JeZQXXDAg4uDGmf56DmfUIa0ZwGvQu0C',
  paypalClientSecret: 'EN80pu5V01lD1AKqzIy5ufwXWXePU1kpYebAMX8rGImN98i8TAvgKpVqJ2DwdsVcMuNlqQlmfrOOI1yV',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
