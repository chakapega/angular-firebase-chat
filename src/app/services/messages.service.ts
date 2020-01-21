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
  private observedArrayOfMessages = new Subject<Array<object>>();
  private observedEditableMessage = new Subject<object>();

  public setArrayOfMessages(messages: Array<object>): void {
    this.observedArrayOfMessages.next(messages);
  }

  public getArrayOfMessages(): Observable<Array<object>> {
    return this.observedArrayOfMessages.asObservable();
  }

  public setEditableMessage(editableMessage: object): void {
    this.observedEditableMessage.next(editableMessage);
  }

  public getEditableMessage(): Observable<object> {
    return this.observedEditableMessage.asObservable();
  }

  public sendMessage(message, email, imageUrl): void {
    firestore
      .collection('messages')
      .doc()
      .set({
        email: email,
        message: message,
        timeStamp: this.getTimeStamp(),
        imageUrl: imageUrl
      });
  }

  public removeMessage(id, email): void {
    if (this.email === email) {
      firestore
        .collection('messages')
        .doc(id)
        .delete();
    }
  }

  public editMessage(id, message): void {
    firestore
      .collection('messages')
      .doc(id)
      .update({
        message: message
      });
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

  private getTimeStamp(): string {
    const currentDate = new Date();
    const [, , dayOfTheMonth, year, time] = currentDate.toString().split(' ');
    const month = currentDate.getMonth() + 1;

    return `${dayOfTheMonth}/${month}/${year} ${time}`;
  }

  private setUser(user): void {
    if (user.email) {
      this.email = user.email;
    } else {
      this.email = '';
    }
  }
}
