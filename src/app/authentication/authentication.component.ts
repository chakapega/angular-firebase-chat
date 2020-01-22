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
  private displayName: string = '';
  private photoURL: string = '';

  public ngOnInit(): void {
    this.authService.getUser().subscribe(user => {
      this.setUser(user);
    });
  }

  private signIn(authProvider): void {
    this.authService.signIn(authProvider);
  }

  private signOut(): void {
    this.authService.signOut();
  }

  private authenticationHandler(event): void {
    if (this.isAutorized) {
      this.signOut();
    } else {
      this.signIn(event.target.name);
    }
  }

  private setUser(user): void {
    if (user.displayName) {
      this.isAutorized = true;
      this.displayName = user.displayName;
      this.photoURL = user.photoURL;
    } else {
      this.isAutorized = false;
      this.displayName = '';
      this.photoURL = '';
    }
  }
}
