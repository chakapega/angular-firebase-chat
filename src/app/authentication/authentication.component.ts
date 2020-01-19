import { Component, OnInit } from '@angular/core';

// import { auth, googleAuthProvider } from '../../firebase/firebase';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {
  public isAutorized = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getUser().subscribe(user => {
      this.setUser(user);
    });

    this.authService.addOnAuthStateChangedHandler();
  }

  signIn() {
    this.authService.signIn();
  }

  signOut() {
    this.authService.signOut();
  }

  authenticationHandler() {
    if (this.isAutorized) {
      this.signOut();
    } else {
      this.signIn();
    }
  }

  setUser(user) {
    if (user.uid) {
      this.isAutorized = true;
    } else {
      this.isAutorized = false;
    }
  }

  // ngOnInit() {
  //   auth.onAuthStateChanged(user => {
  //     if (user) {
  //       const { uid, email } = user;
  //       const userData = {
  //         uid,
  //         email
  //       };

  //       this.authService.setUserData(userData);
  //       this.isAutorized = true;
  //     } else {
  //       this.isAutorized = false;
  //     }
  //   });
  // }

  // signIn() {
  //   auth.signInWithPopup(googleAuthProvider).then(result => {
  //     const { uid, email } = result.user;
  //     const userData = {
  //       uid,
  //       email
  //     };

  //     this.authService.setUserData(userData);
  //     this.isAutorized = true;
  //   });
  // }

  // signOut() {
  //   auth.signOut().then(() => {
  //     this.isAutorized = false;
  //   });
  // }

  // authenticationHandler() {
  //   if (this.isAutorized) {
  //     this.signOut();
  //   } else {
  //     this.signIn();
  //   }
  // }
}
