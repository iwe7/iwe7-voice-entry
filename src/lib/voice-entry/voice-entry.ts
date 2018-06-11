import { takeWhile, takeUntil } from 'rxjs/operators';
import { Iwe7UrlService } from 'iwe7-url';
import { Component, OnInit, ComponentFactoryResolver, Optional, Input, ChangeDetectorRef, NgZone } from '@angular/core';
import { Iwe7MenuService, Iwe7MaskService } from 'iwe7-layout';
import { VoiceRecorderComponent } from '../voice-recorder/voice-recorder';
import { interval, Subject } from 'rxjs';

@Component({
    selector: 'voice-entry',
    templateUrl: 'voice-entry.html',
    styleUrls: ['./voice-entry.scss']
})

export class VoiceEntryComponent implements OnInit {
    @Input() time: number = 5000;
    @Input() url: string = this._url.getOpenUrl('baidu/speech');
    timeLen: number = 0;
    text: string = '不支持';
    constructor(
        @Optional()
        public menu: Iwe7MenuService,
        @Optional()
        public mask: Iwe7MaskService,
        public resolver: ComponentFactoryResolver,
        public _url: Iwe7UrlService,
        public cd: ChangeDetectorRef,
        public zone: NgZone
    ) { }
    ngOnInit() { }
    start() {
        const factory = this.resolver.resolveComponentFactory(VoiceRecorderComponent);
        if (this.menu && this.mask) {
            this.menu.show('bottom', 270, factory, {
                time: this.time
            }).subscribe(res => {
                this.zone.run(() => {
                    this.timeLen = res.time;
                    this.cd.markForCheck();
                });
                console.log(res);
            });
            this.mask.show();
        } else {
            console.warn('请配合iwe7-layout组件使用');
        }
    }
}
