import { Iwe7MenuService } from 'iwe7-layout';
import { DomSanitizer } from '@angular/platform-browser';
import { Iwe7MediaStreamProvider } from './../media-stream/media-stream';
import { HttpClient } from '@angular/common/http';
import { CustomComponent } from 'iwe7-core';
import { LayoutOutletComponent } from 'iwe7-layout';
import {
    Component, OnInit, Injector,
    ViewChild, ElementRef, ChangeDetectorRef,
    ChangeDetectionStrategy, Input
} from '@angular/core';
import { Iwe7MediaStream } from '../media-stream/media-stream';
import { Iwe7Platform } from 'iwe7-core';

@Component({
    selector: 'voice-recorder',
    templateUrl: 'voice-recorder.html',
    styleUrls: ['./voice-recorder.scss'],
    providers: [
        Iwe7MediaStreamProvider
    ],
    changeDetection: ChangeDetectionStrategy.Default
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
    @Input() title: string = '录音输入';
    @Input() confirmTitle: string = '录音完成';
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

    // 发送
    sure(e: any) {
        this._customClose(this._customData);
    }
    // 取消
    cancel(e: any) {
        this._customClose();
    }
    // 返回重录
    back(e: any) {
        this.showPreview = false;
        this.showTip = false;
    }
    // 触发长按
    onPress(e: any) {
        this.showTip = true;
        this.showPreview = false;
        this.cd.markForCheck();
    }
    // 结束长按
    onRelease(e: any) {
        setTimeout(() => {
            this.showTip = false;
            this.showPreview = true;
            this.title = this.confirmTitle;
            this.cd.markForCheck();
        }, 200);
    }
    // 按压中计时
    onPressing(e: any) {
        this.pressTime = e;
        this.cd.markForCheck();
    }
}
