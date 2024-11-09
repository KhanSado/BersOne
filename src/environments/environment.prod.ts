import packageInfo from '../../package.json';

// export const environment = {
  // appVersion: packageInfo.version,
  // production: true,
  // apiUrl: 'http://localhost:4200'
// };
export const environment = {
  production: true,
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
