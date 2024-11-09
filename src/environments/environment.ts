// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import packageInfo from '../../package.json';

// export const environment = {
  // appVersion: packageInfo.version,
  // production: false,
  // apiUrl: 'http://localhost:4200'
// };

export const environment = {
  production: false,
  appVersion: packageInfo.version,
  apiUrl: 'http://localhost:4200',
  firebase: {
    apiKey: "AIzaSyA5pWIipuIMpBYhBZathD-v-osVEpSJSns",
    authDomain: "bersone-f6467.firebaseapp.com",
    projectId: "bersone-f6467",
    storageBucket: "bersone-f6467.firebasestorage.app",
    messagingSenderId: "740394568542",
    appId: "1:740394568542:web:759223c9edf3c452a05dcf",
    measurementId: "G-BXH1GCP2VN"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
