import { VoiceRecorderModule } from './../voice-recorder/module';
import { MatChipsModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { VoiceEntryComponent } from './voice-entry';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        CommonModule,
        MatChipsModule,
        VoiceRecorderModule
    ],
    declarations: [
        VoiceEntryComponent
    ],
    exports: [
        VoiceEntryComponent
    ]
})
export class VoiceEntryModule { }
