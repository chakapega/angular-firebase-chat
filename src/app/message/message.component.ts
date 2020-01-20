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

  public ngOnInit() {}

  private editMessage() {
    console.log(this.message.id);
  }

  private removeMessage() {
    this.messagesService.removeMessage(this.message.id, this.message.displayName);
  }
}
