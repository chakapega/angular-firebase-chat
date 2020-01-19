import { Component, OnInit } from '@angular/core';

import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss']
})
export class MessageBoxComponent implements OnInit {
  constructor(private messageService: MessageService) {}

  public arrayOfMessages: Array<object>;

  ngOnInit() {
    this.messageService.getArrayOfMessages().subscribe(arrayOfMessages => {
      this.setArrayOfMessages(arrayOfMessages);
    });
  }

  setArrayOfMessages(arrayOfMessages) {
    this.arrayOfMessages = arrayOfMessages;
  }
}
