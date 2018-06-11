import { Iwe7IcssService } from 'iwe7-icss';
import { BaseWithIcss } from 'iwe7-base';
import { VoiceTransferComponent } from './../voice-transfer/voice-transfer';
import { ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Iwe7UrlService } from 'iwe7-url';
import {
    Component, OnInit,
    ComponentFactoryResolver,
    Optional, Input, ChangeDetectorRef, NgZone,
    Injector
} from '@angular/core';
import { Iwe7MenuService, Iwe7MaskService } from 'iwe7-layout';
import { VoiceRecorderComponent } from '../voice-recorder/voice-recorder';
import { onFocus, onBlur } from 'iwe7-util';
import { ViewportRuler } from '@angular/cdk/scrolling';
@Component({
    selector: 'voice-entry',
    templateUrl: 'voice-entry.html',
    styleUrls: ['./voice-entry.scss'],
    providers: [Iwe7IcssService]
})

export class VoiceEntryComponent extends BaseWithIcss implements OnInit, AfterViewInit {
    @Input() time: number = 5000;
    @Input() url: string = this._url.getOpenUrl('baidu/speech');
    timeLen: number = 0;
    text: string = '不支持';
    @ViewChild('input') input: ElementRef;
    @Input() placeholder: string = '请输入文字';
    constructor(
        @Optional()
        public menu: Iwe7MenuService,
        @Optional()
        public mask: Iwe7MaskService,
        public resolver: ComponentFactoryResolver,
        public _url: Iwe7UrlService,
        public cd: ChangeDetectorRef,
        public zone: NgZone,
        injector: Injector,
        public viewport: ViewportRuler
    ) {
        super(injector);
    }
    ngOnInit() {
        this.viewport.change().subscribe(res => {
            console.log('change', res);
        });
    }

    ngAfterViewInit() {
        onFocus(this.input.nativeElement).subscribe(res => {
            this.focus();
        });
    }

    blur() {
        this.menu.hide();
    }

    focus() {
        const factory = this.resolver.resolveComponentFactory(VoiceTransferComponent);
    }
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
