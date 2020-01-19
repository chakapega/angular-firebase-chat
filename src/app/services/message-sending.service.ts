import { Injectable } from '@angular/core';
import { firestore } from '../../firebase/firebase';

@Injectable()
export class MessageSendingService {
  constructor() {}

  sendMessage(message, email) {
    firestore
      .collection('messages')
      .doc()
      .set({
        userEmail: email,
        userMessage: message
      })
      .then(function() {
        console.log('Document successfully written!');
      })
      .catch(error => {
        console.error('Error writing document: ', error);
      });
  }
}
