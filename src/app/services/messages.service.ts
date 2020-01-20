import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { firestore } from '../../firebase/firebase';

@Injectable()
export class MessagesService {
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
        userMessage: message,
        messageTimeStamp: this.getTimeStamp()
      })
      .then(() => {
        console.log('Document successfully written!');
      })
      .catch(error => {
        console.error('Error writing document: ', error);
      });
  }

  private getMessages(): void {
    firestore
      .collection('messages')
      .orderBy('messageTimeStamp', 'asc')
      .onSnapshot(querySnapshot => {
        const messages: Array<object> = [];

        querySnapshot.forEach(doc => {
          messages.push(doc.data());
        });
        this.setArrayOfMessages(messages);
      });
  }

  private getTimeStamp() {
    const currentDate = new Date();
    const [, , dayOfTheMonth, year, time] = currentDate.toString().split(' ');
    const month = currentDate.getMonth() + 1;

    return `${dayOfTheMonth}/${month}/${year} ${time}`;
  }
}
