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

  private displayName = '';
  private uid = '';
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

  public sendMessage(message, displayName, imageUrl): void {
    firestore
      .collection('messages')
      .doc()
      .set({
        displayName,
        message,
        timeStamp: this.getTimeStamp(),
        imageUrl,
        uid: this.uid
      });
  }

  public removeMessage(id, uid): void {
    if (this.uid === uid) {
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
        message
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
    if (user.displayName) {
      this.displayName = user.displayName;
      this.uid = user.uid;
    } else {
      this.displayName = '';
      this.uid = '';
    }
  }
}
