import { Component, OnInit } from '@angular/core';

import { storage } from '../../firebase/firebase';
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
  private displayName: string = '';
  private messageSendingInput: any;
  private placeholderText: string = 'Sign in to write messages';
  private isDraggedImage: boolean = false;
  private file: File;
  private imageUrl: string = '';

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
        this.messagesService.sendMessage(this.message, this.displayName, this.imageUrl);
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
    if (this.isDraggedImage) {
      this.sendImage();
    } else {
      this.sendMessage();
    }

    this.isDraggedImage = false;
    this.messageSendingInput.focus();
    this.imageUrl = '';
  }

  private setUser(user: User): void {
    this.uid = user.uid;
    this.displayName = user.displayName;

    if (user.displayName) {
      this.placeholderText = 'Write a text to send a message';
    } else {
      this.placeholderText = 'Sign in to write messages';
    }
  }

  private dragEnterHandler(): void {
    this.isDraggedImage = true;
  }

  private dragLeaveHandler(): void {
    this.isDraggedImage = false;
  }

  private dropHandler(event): void {
    const file = event.dataTransfer.files[0];

    this.file = file;
  }

  private sendImage(): void {
    const storageRef = storage.ref('images/' + this.file.name);
    const task = storageRef.put(this.file);
    const messagesService = this.messagesService;
    const displayName = this.displayName;

    task.on(
      'state_changed',
      function progress() {},
      function error() {},
      function complete() {
        task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          messagesService.sendMessage('', displayName, downloadURL);
        });
      }
    );
  }
}
