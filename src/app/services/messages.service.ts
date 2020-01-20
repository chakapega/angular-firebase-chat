import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { firestore } from '../../firebase/firebase';

import { AuthService } from './auth.service';

@Injectable()
export class MessagesService {
  constructor(private authService: AuthService) {
    this.authService.getUser().subscribe(user => {
      this.setUser(user);
    });
    this.getMessages();
  }

  private email: string = '';
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
        email: email,
        message: message,
        timeStamp: this.getTimeStamp()
      })
      .then(() => {
        console.log('Document successfully written!');
      })
      .catch(error => {
        console.error('Error writing document: ', error);
      });
  }

  public removeMessage(id, email) {
    if (this.email === email) {
      firestore
        .collection('messages')
        .doc(id)
        .delete()
        .then(function() {
          console.log('Document successfully deleted!');
        })
        .catch(function(error) {
          console.error('Error removing document: ', error);
        });
    }
  }

  private getMessages(): void {
    firestore
      .collection('messages')
      .orderBy('timeStamp', 'asc')
      .onSnapshot(querySnapshot => {
        const messages: Array<object> = [];

        querySnapshot.forEach(doc => {
          const message = doc.data();

          message.id = doc.id;
          messages.push(message);
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

  private setUser(user) {
    if (user.email) {
      this.email = user.email;
    } else {
      this.email = '';
    }
  }
}
