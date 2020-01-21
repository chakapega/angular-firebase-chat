import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { MessagesService } from '../services/messages.service';

@Component({
  selector: 'app-message-editing',
  templateUrl: './message-editing.component.html',
  styleUrls: ['./message-editing.component.scss']
})
export class MessageEditingComponent implements OnInit {
  constructor(private authService: AuthService, private messagesService: MessagesService) {}

  message: string = '';
  isEditing: boolean = false;
  email: string = '';
  emailAuthor: string = '';
  id: string = '';

  ngOnInit() {
    this.authService.getUser().subscribe(user => {
      this.setUser(user);
    });
    this.messagesService.getEditableMessage().subscribe(editableMessage => {
      this.setEditableMessage(editableMessage);
    });
  }

  setEditableMessage(editableMessage) {
    const { id, email, message } = editableMessage;

    if (this.emailAuthor === email) {
      this.id = id;
      this.emailAuthor = email;
      this.message = message;
      this.isEditing = true;
    }
  }

  private setUser(user) {
    if (user.email) {
      this.emailAuthor = user.email;
    } else {
      this.emailAuthor = '';
    }
  }

  private editMessage() {
    if (this.message.length) {
      this.messagesService.editMessage(this.id, this.message);
      this.isEditing = false;
    }
  }

  keyPressHandler(event) {
    if (event.code === 'Enter' && !event.shiftKey) {
      this.editMessage();
    }
  }

  clickHandler() {
    this.editMessage();
  }
}
