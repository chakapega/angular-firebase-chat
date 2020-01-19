import { Component, Input, OnInit } from '@angular/core';

import { Message } from '../shared/interfaces';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  constructor() {}

  @Input() message: Message;

  ngOnInit() {}
}
