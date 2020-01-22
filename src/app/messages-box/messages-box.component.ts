import { Component, OnInit, AfterViewChecked } from '@angular/core';

import { MessagesService } from '../services/messages.service';

@Component({
  selector: 'app-messages-box',
  templateUrl: './messages-box.component.html',
  styleUrls: ['./messages-box.component.scss']
})
export class MessagesBoxComponent implements OnInit, AfterViewChecked {
  constructor(private messagesService: MessagesService) {}

  public arrayOfMessages: Array<object>;
  private messagesBox: any;

  public ngOnInit(): void {
    this.messagesService.getArrayOfMessages().subscribe(arrayOfMessages => {
      this.setArrayOfMessages(arrayOfMessages);
    });

    this.messagesBox = document.querySelector('.messages-box');
  }

  public ngAfterViewChecked(): void {
    this.messagesBox.scrollTop = this.messagesBox.scrollHeight;
  }

  private setArrayOfMessages(arrayOfMessages): void {
    this.arrayOfMessages = arrayOfMessages;
  }
}
