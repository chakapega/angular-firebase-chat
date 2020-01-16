import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MessageSendingFormComponent } from './message-sending-form/message-sending-form.component';
import { MessageBoxComponent } from './message-box/message-box.component';

@NgModule({
  declarations: [
    AppComponent,
    MessageSendingFormComponent,
    MessageBoxComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
