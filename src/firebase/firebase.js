import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyC-Ml5kUWAJAb-ozB7qCFToexzK9qXvmnY',
  authDomain: 'angular-firebase-chat-f0e7e.firebaseapp.com',
  databaseURL: 'https://angular-firebase-chat-f0e7e.firebaseio.com',
  projectId: 'angular-firebase-chat-f0e7e',
  storageBucket: 'angular-firebase-chat-f0e7e.appspot.com',
  messagingSenderId: '641178443165',
  appId: '1:641178443165:web:80eb595c67221d74a36374'
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
