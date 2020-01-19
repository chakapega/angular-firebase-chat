import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { firestore } from '../../firebase/firebase';

@Injectable()
export class MessageService {
  constructor() {
    this.getMessages();
  }

  private subject = new Subject<Array<object>>();

  public setArrayOfMessages(messages: Array<object>): void {
    this.subject.next(messages);
  }

  public getArrayOfMessages(): Observable<Array<object>> {
    return this.subject.asObservable();
  }

  public sendMessage(message, email): void {
    firestore
      .collection('messages')
      .doc()
      .set({
        userEmail: email,
        userMessage: message
      })
      .then(() => {
        console.log('Document successfully written!');
      })
      .catch(error => {
        console.error('Error writing document: ', error);
      });
  }

  private getMessages(): void {
    const messages: Array<object> = [];

    firestore
      .collection('messages')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          messages.push(doc.data());
        });

        this.setArrayOfMessages(messages.reverse());
      });
  }
}
