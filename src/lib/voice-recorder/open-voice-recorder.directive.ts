import { VoiceRecorderComponent } from './voice-recorder';
import { Iwe7MenuService } from 'iwe7-layout';
import {
    Directive, ComponentFactoryResolver,
    Output, EventEmitter, Input, HostListener
} from '@angular/core';

@Directive({ selector: '[openVoiceRecorder]' })
export class OpenVoiceRecorderDirective {
    @Output() openVoiceRecorder: EventEmitter<any> = new EventEmitter();
    @Input() openVoiceRecorderTimeLen: number = 0;
    @Input() openVoiceRecorderLocalId: string;
    @Input() openVoiceRecorderServeId: string;

    @HostListener('tap', ['$event'])
    _tap(e: any) {
        this.open();
    }

    subscribtion: any;
    constructor(
        public menu: Iwe7MenuService,
        public resolver: ComponentFactoryResolver
    ) { }

    hide() {
        this.menu.hide();
    }
    open() {
        if (this.subscribtion) {
            this.subscribtion.unsubscribe();
        }
        const factory = this.resolver.resolveComponentFactory(VoiceRecorderComponent);
        this.subscribtion = this.menu.show('bottom', 270, factory, {
            timeLen: this.openVoiceRecorderTimeLen || 0,
            localId: this.openVoiceRecorderLocalId,
            serveId: this.openVoiceRecorderServeId
        }).subscribe(res => {
            if (res) {
                this.openVoiceRecorder.emit({
                    timeLen: res.timeLen || 0,
                    localId: res.localId,
                    serveId: res.serveId
                });
            }
        });
    }
}
