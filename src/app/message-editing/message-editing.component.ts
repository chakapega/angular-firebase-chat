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

  public message = '';
  public isEditing = false;
  private uidAuthor = '';
  private id = '';

  public ngOnInit(): void {
    this.authService.getUser().subscribe(user => {
      this.setUser(user);
    });
    this.messagesService.getEditableMessage().subscribe(editableMessage => {
      this.setEditableMessage(editableMessage);
    });
  }

  private setEditableMessage(editableMessage): void {
    const { id, uid, message } = editableMessage;

    if (this.uidAuthor === uid) {
      this.id = id;
      this.uidAuthor = uid;
      this.message = message;
      this.isEditing = true;
    }
  }

  private setUser(user): void {
    if (user.uid) {
      this.uidAuthor = user.uid;
    } else {
      this.uidAuthor = '';
    }
  }

  private editMessage(): void {
    if (this.message.length) {
      this.messagesService.editMessage(this.id, this.message);
      this.isEditing = false;
    }
  }

  public keyPressHandler(event): void {
    if (event.code === 'Enter' && !event.shiftKey) {
      this.editMessage();
    }
  }

  public clickHandler(): void {
    this.editMessage();
  }
}
