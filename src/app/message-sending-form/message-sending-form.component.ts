import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { MessageSendingService } from '../services/message-sending.service';

import { User } from '../models/user.model';

@Component({
  selector: 'app-message-sending-form',
  templateUrl: './message-sending-form.component.html',
  styleUrls: ['./message-sending-form.component.scss']
})
export class MessageSendingFormComponent implements OnInit {
  message: string;
  uid: string;
  email: string;

  constructor(private authService: AuthService, private messageSendingService: MessageSendingService) {}

  ngOnInit() {
    this.authService.getUser().subscribe(user => {
      this.setUser(user);
    });
  }

  sendMessage() {
    if (this.uid) {
      this.messageSendingService.sendMessage(this.message, this.email);
      this.message = '';
    }
  }

  setUser(user: User) {
    this.uid = user.uid;
    this.email = user.email;
  }

  // ngOnInit() {
  // this.authService.getUserData().subscribe(userData => {
  //   this.setProperties(userData);
  // });
  // }

  // setProperties(userData: object) {
  //   console.log(userData);
  //   this.uid = userData.uid;
  //   this.userEmail = userData.email;
  // }

  // sendMessage(event: any) {
  //   event.preventDefault();

  //   const message = event.target.message.value;

  //   firestore
  //     .collection('messages')
  //     .doc()
  //     .set({
  //       userEmail: this.userEmail,
  //       userMessage: message
  //     })
  //     .then(function() {
  //       console.log('Document successfully written!');
  //       this.messageSendingForm.reset();
  //     })
  //     .catch(function(error) {
  //       console.error('Error writing document: ', error);
  //     });
  // }
}
