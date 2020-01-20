import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { auth, googleAuthProvider } from '../../firebase/firebase';

import { User } from '../shared/interfaces';

@Injectable()
export class AuthService {
  constructor() {
    this.addAuthStateChangeHandler();
  }

  private subject = new Subject<User>();

  public setUser(user: User): void {
    this.subject.next(user);
  }

  public getUser(): Observable<object> {
    return this.subject.asObservable();
  }

  public signIn() {
    auth.signInWithPopup(googleAuthProvider).then(result => {
      const { uid, displayName, photoURL } = result.user;

      this.setUser({ uid, displayName, photoURL });
    });
  }

  public signOut() {
    auth.signOut().then(() => {});
  }

  private addAuthStateChangeHandler() {
    auth.onAuthStateChanged(result => {
      if (result) {
        const { uid, displayName, photoURL } = result;

        this.setUser({ uid, displayName, photoURL });
      } else {
        this.setUser({ uid: '', displayName: '', photoURL: '' });
      }
    });
  }
}
