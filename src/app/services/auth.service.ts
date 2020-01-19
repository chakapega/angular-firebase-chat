import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { auth, googleAuthProvider } from '../../firebase/firebase';

@Injectable()
export class AuthService {
  // user: User;
  // private user: Observable<User>;
  private subject = new Subject<object>();

  public setUser(user: object): void {
    this.subject.next(user);
  }

  public getUser(): Observable<object> {
    return this.subject.asObservable();
  }

  signIn() {
    auth.signInWithPopup(googleAuthProvider).then(result => {
      const { uid, email } = result.user;
      // console.log(uid, email);
      const user = {
        uid,
        email
      };

      this.setUser(user);
    });
  }

  signOut() {
    auth.signOut().then(() => {});
  }

  addOnAuthStateChangedHandler() {
    auth.onAuthStateChanged(result => {
      if (result) {
        const { uid, email } = result;
        const user = {
          uid,
          email
        };

        this.setUser(user);
      } else {
        this.setUser({ uid: '', email: '' });
      }
    });
  }
}
