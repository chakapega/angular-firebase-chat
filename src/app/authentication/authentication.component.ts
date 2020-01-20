import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {
  constructor(private authService: AuthService) {}

  private isAutorized: boolean = false;
  private email: string = '';
  private photoURL: string = '';

  public ngOnInit() {
    this.authService.getUser().subscribe(user => {
      this.setUser(user);
    });
  }

  private signIn() {
    this.authService.signIn();
  }

  private signOut() {
    this.authService.signOut();
  }

  private authenticationHandler() {
    if (this.isAutorized) {
      this.signOut();
    } else {
      this.signIn();
    }
  }

  private setUser(user) {
    if (user.email) {
      this.isAutorized = true;
      this.email = user.email;
      this.photoURL = user.photoURL;
    } else {
      this.isAutorized = false;
      this.email = '';
      this.photoURL = '';
    }
  }
}
