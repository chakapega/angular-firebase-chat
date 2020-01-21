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

  public ngOnInit(): void {
    this.authService.getUser().subscribe(user => {
      this.setUser(user);
    });
  }

  private signIn(): void {
    this.authService.signIn();
  }

  private signOut(): void {
    this.authService.signOut();
  }

  private authenticationHandler(): void {
    if (this.isAutorized) {
      this.signOut();
    } else {
      this.signIn();
    }
  }

  private setUser(user): void {
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
