import { OnPressDirective } from './on-press';
import { MatButtonModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Iwe7MediaStreamProvider } from './media-stream/media-stream';
import { Iwe7NavbarModule } from 'iwe7-navbar';
import { Iwe7LayoutModule } from 'iwe7-layout';
import { VoiceRecorderComponent } from './voice-recorder/voice-recorder';
import { VoiceEntryComponent } from './voice-entry/voice-entry';
import { NgModule } from '@angular/core';
import { Iwe7HammerModule } from 'iwe7-hammer';

@NgModule({
  imports: [
    Iwe7LayoutModule,
    Iwe7NavbarModule,
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    Iwe7HammerModule
  ],
  declarations: [
    VoiceEntryComponent,
    VoiceRecorderComponent,
    OnPressDirective
  ],
  exports: [
    VoiceEntryComponent,
    VoiceRecorderComponent,
    OnPressDirective
  ],
  entryComponents: [
    VoiceRecorderComponent
  ],
  providers: [
    Iwe7MediaStreamProvider
  ]
})
export class Iwe7VoiceEntryModule { }
