import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { MessagesService } from './services/messages.service';
import { MessageSendingComponent } from './message-sending/message-sending.component';
import { MessagesBoxComponent } from './messages-box/messages-box.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { MessageComponent } from './message/message.component';
import { ActiveUsersComponent } from './active-users/active-users.component';

@NgModule({
  declarations: [
    AppComponent,
    MessageSendingComponent,
    MessagesBoxComponent,
    AuthenticationComponent,
    MessageComponent,
    ActiveUsersComponent
  ],
  imports: [BrowserModule, FormsModule],
  providers: [AuthService, MessagesService],
  bootstrap: [AppComponent]
})
export class AppModule {}
