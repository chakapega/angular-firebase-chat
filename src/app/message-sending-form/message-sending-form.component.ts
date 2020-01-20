import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { MessagesService } from '../services/messages.service';
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
  messageSendingInput: any;
  placeholderText: string;

  constructor(private authService: AuthService, private messagesService: MessagesService) {}

  public ngOnInit() {
    this.authService.getUser().subscribe((user: User) => {
      this.setUser(user);
    });

    this.messageSendingInput = document.querySelector('#message-sending-input');
  }

  private sendMessage() {
    if (this.uid && this.message) {
      if (this.message.trim()) {
        this.messagesService.sendMessage(this.message, this.email);
        this.message = '';
      }
    }
  }

  keyPressHandler(event) {
    if (event.code === 'Enter' && !event.shiftKey) {
      this.sendMessage();
    }
  }

  clickHandler() {
    this.sendMessage();
    this.messageSendingInput.focus();
  }

  private setUser(user: User) {
    this.uid = user.uid;
    this.email = user.email;

    if (user.uid) {
      this.placeholderText = 'Write a text to send a message';
    } else {
      this.placeholderText = 'Sign in to write messages';
    }
  }
}
