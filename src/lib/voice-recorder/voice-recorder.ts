import { Iwe7MenuService } from 'iwe7-layout';
import { DomSanitizer } from '@angular/platform-browser';
import { Iwe7MediaStreamProvider } from './../media-stream/media-stream';
import { HttpClient } from '@angular/common/http';
import { CustomComponent } from 'iwe7-core';
import { LayoutOutletComponent } from 'iwe7-layout';
import { Component, OnInit, Injector, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Iwe7MediaStream } from '../media-stream/media-stream';
import { switchMap, tap } from 'rxjs/operators';
import { Iwe7Platform } from 'iwe7-core';

@Component({
    selector: 'voice-recorder',
    templateUrl: 'voice-recorder.html',
    styleUrls: ['./voice-recorder.scss'],
    providers: [
        Iwe7MediaStreamProvider
    ]
})
export class VoiceRecorderComponent extends CustomComponent<any> implements OnInit {
    @ViewChild(LayoutOutletComponent) layout: LayoutOutletComponent;
    src: string;
    @ViewChild('audio') audio: ElementRef;
    mediaStreamRecorder: any;
    urls: any[] = [];
    showTip: boolean = false;
    pressTime: number = 0;
    showPreview: boolean = false;
    constructor(
        injector: Injector,
        public media: Iwe7MediaStream,
        public http: HttpClient,
        public cd: ChangeDetectorRef,
        public dm: DomSanitizer,
        public menu: Iwe7MenuService,
        public platform: Iwe7Platform
    ) {
        super(injector);
        this.menu.subscribe(res => {
            if (!res) {
                this.setCyc('ngOnDestory', res, true);
            }
        });
    }

    ngOnInit() {
        this.layout.showHeader();
    }

    start(time: number = 5000) {
        this.mediaStreamRecorder.start(time);
    }

    save() {
        this.mediaStreamRecorder.save();
    }

    resume() {
        this.mediaStreamRecorder.resume();
    }

    pause() {
        this.mediaStreamRecorder.pause();
    }

    stop() {
        this.mediaStreamRecorder.stop();
    }

    sure(e: any) {
        this._customClose(this._customData);
    }

    cancel(e: any) {
        this._customClose();
    }

    onPress(e: any) {
        this.showTip = true;
        this.showPreview = false;
        this.cd.markForCheck();
    }

    onRelease(e: any) {
        this.showTip = false;
        this.showPreview = true;
        this.cd.markForCheck();
    }

    onPressing(e: any) {
        this.pressTime = e;
        this.cd.markForCheck();
    }
}
