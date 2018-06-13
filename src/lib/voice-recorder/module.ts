import { Iwe7OnPressModule } from 'iwe7-on-press';
import { OpenVoiceRecorderDirective } from './open-voice-recorder.directive';
import { MatProgressSpinnerModule, MatButtonModule } from '@angular/material';
import { Iwe7NavbarModule } from 'iwe7-navbar';
import { Iwe7LayoutModule } from 'iwe7-layout';
import { CommonModule } from '@angular/common';
import { VoiceRecorderComponent } from './voice-recorder';
import { NgModule } from '@angular/core';


@NgModule({
    imports: [
        CommonModule,
        Iwe7LayoutModule,
        Iwe7NavbarModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        Iwe7OnPressModule
    ],
    exports: [
        VoiceRecorderComponent,
        OpenVoiceRecorderDirective
    ],
    declarations: [
        VoiceRecorderComponent,
        OpenVoiceRecorderDirective
    ],
    entryComponents: [
        VoiceRecorderComponent
    ],
    providers: [],
})
export class VoiceRecorderModule { }
