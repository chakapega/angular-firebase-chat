import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.scss']
})
export class ActiveUsersComponent implements OnInit {
  constructor(private authService: AuthService) { }

  private displayName: string = '';

  ngOnInit() {
    this.authService.getUser().subscribe(user => {
      this.setUser(user);
    });
  }

  private setUser(user) {
    if (user.uid) {
      this.displayName = user.displayName;
    } else {
      this.displayName = '';
    }
  }

}
