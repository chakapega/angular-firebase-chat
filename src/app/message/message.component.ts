import { Component, Input, OnInit } from '@angular/core';

import { MessagesService } from '../services/messages.service';
import { Message } from '../shared/interfaces';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  constructor(private messagesService: MessagesService) {}

  @Input() message: Message;

  public ngOnInit(): void {}

  public editMessage(): void {
    const editableMessage = {
      id: this.message.id,
      uid: this.message.uid,
      message: this.message.message
    };

    this.messagesService.setEditableMessage(editableMessage);
  }

  public removeMessage(): void {
    this.messagesService.removeMessage(this.message.id, this.message.uid);
  }

  public imageloadHandler(): void {}
}
