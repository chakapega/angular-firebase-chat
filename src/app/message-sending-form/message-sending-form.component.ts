import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { MessageService } from '../services/message.service';
import { User } from '../shared/interfaces';

@Component({
  selector: 'app-message-sending-form',
  templateUrl: './message-sending-form.component.html',
  styleUrls: ['./message-sending-form.component.scss']
})
export class MessageSendingFormComponent implements OnInit {
  message: string;
  uid: string;
  email: string;

  constructor(private authService: AuthService, private messageService: MessageService) {}

  ngOnInit() {
    this.authService.getUser().subscribe((user: User) => {
      this.setUser(user);
    });
  }

  sendMessage() {
    if (this.uid) {
      this.messageService.sendMessage(this.message, this.email);
      this.message = '';
    }
  }

  setUser(user: User) {
    this.uid = user.uid;
    this.email = user.email;
  }
}
