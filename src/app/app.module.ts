import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { MessageService } from './services/message.service';
import { MessageSendingFormComponent } from './message-sending-form/message-sending-form.component';
import { MessageBoxComponent } from './message-box/message-box.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { MessageComponent } from './message/message.component';

@NgModule({
  declarations: [
    AppComponent,
    MessageSendingFormComponent,
    MessageBoxComponent,
    AuthenticationComponent,
    MessageComponent
  ],
  imports: [BrowserModule, FormsModule],
  providers: [AuthService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule {}
