import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { MessagesService } from '../services/messages.service';
import { User } from '../shared/interfaces';

@Component({
  selector: 'app-message-sending',
  templateUrl: './message-sending.component.html',
  styleUrls: ['./message-sending.component.scss']
})
export class MessageSendingComponent implements OnInit {
  private message: string = '';
  private uid: string = '';
  private email: string = '';
  private messageSendingInput: any;
  private placeholderText: string = 'Sign in to write messages';

  constructor(private authService: AuthService, private messagesService: MessagesService) {}

  public ngOnInit(): void {
    this.authService.getUser().subscribe((user: User) => {
      this.setUser(user);
    });

    this.messageSendingInput = document.querySelector('#message-sending-input');
  }

  private sendMessage(): void {
    if (this.uid && this.message) {
      if (this.message.trim()) {
        this.messagesService.sendMessage(this.message, this.email);
        this.message = '';
      }
    }
  }

  private keyPressHandler(event): void {
    if (event.code === 'Enter' && !event.shiftKey) {
      this.sendMessage();
    }
  }

  private clickHandler(): void {
    this.sendMessage();
    this.messageSendingInput.focus();
  }

  private setUser(user: User): void {
    this.uid = user.uid;
    this.email = user.email;

    if (user.uid) {
      this.placeholderText = 'Write a text to send a message';
    } else {
      this.placeholderText = 'Sign in to write messages';
    }
  }
}
