import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { auth, googleAuthProvider } from '../../firebase/firebase';

import { User } from '../shared/interfaces';

@Injectable()
export class AuthService {
  constructor() {
    this.addAuthStateChangeHandler();
  }

  private observedUser = new Subject<User>();

  public setUser(user: User): void {
    this.observedUser.next(user);
  }

  public getUser(): Observable<object> {
    return this.observedUser.asObservable();
  }

  public signIn(): void {
    auth.signInWithPopup(googleAuthProvider).then(result => {
      const { uid, email, photoURL } = result.user;

      this.setUser({ uid, email, photoURL });
    });
  }

  public signOut(): void {
    auth.signOut().then(() => {});
  }

  private addAuthStateChangeHandler(): void {
    auth.onAuthStateChanged(result => {
      if (result) {
        const { uid, email, photoURL } = result;

        this.setUser({ uid, email, photoURL });
      } else {
        this.setUser({ uid: '', email: '', photoURL: '' });
      }
    });
  }
}
