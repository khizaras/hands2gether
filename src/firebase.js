import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
const firebaseConfig = {
  apiKey: 'AIzaSyBE8Q0A9fqdta_xeZC1Y00J5qI9A21Cj04',
  authDomain: 'hands2gether-c49c0.firebaseapp.com',
  databaseURL: 'https://hands2gether-c49c0-default-rtdb.firebaseio.com',
  projectId: 'hands2gether-c49c0',
  storageBucket: 'hands2gether-c49c0.appspot.com',
  messagingSenderId: '911777939876',
  appId: '1:911777939876:web:2b453745143d43d0cd4131',
  measurementId: 'G-LYQ8KZ8SHE'
};
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
export default firebaseApp;
