import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { auth, googleAuthProvider, githubAuthProvider } from '../../firebase/firebase';

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

  public signIn(authProvider): void {
    if (authProvider === 'google') {
      auth.signInWithPopup(googleAuthProvider).then(result => {
        const { uid, displayName, photoURL } = result.user;

        this.setUser({ uid, displayName, photoURL });
      });
    } else if (authProvider === 'github') {
      auth.signInWithPopup(githubAuthProvider).then(result => {
        const { uid, displayName, photoURL } = result.user;

        this.setUser({ uid, displayName, photoURL });
      });
    }
  }

  public signOut(): void {
    auth.signOut().then(() => {});
  }

  private addAuthStateChangeHandler(): void {
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
