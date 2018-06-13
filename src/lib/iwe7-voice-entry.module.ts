import { VoiceEntryModule } from './voice-entry/module';
import { VoiceRecorderModule } from './voice-recorder/module';
import { NgModule } from '@angular/core';
@NgModule({
  exports: [
    VoiceRecorderModule,
    VoiceEntryModule
  ]
})
export class Iwe7VoiceEntryModule { }
