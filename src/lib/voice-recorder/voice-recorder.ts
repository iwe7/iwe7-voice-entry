import { tap } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { LayoutOutletComponent, Iwe7MenuService, Iwe7MaskService } from 'iwe7-layout';
import {
    Component, OnInit, Injector,
    ViewChild, ElementRef, ChangeDetectorRef,
    ChangeDetectionStrategy, Input
} from '@angular/core';
import { Iwe7Platform, CustomComponent } from 'iwe7-core';
import { Iwe7JssdkRecordService, Iwe7JssdkService, Iwe7JssdkVoiceService } from 'iwe7-jssdk';
import { Iwe7Url2Service } from 'iwe7-url';

@Component({
    selector: 'voice-recorder',
    templateUrl: 'voice-recorder.html',
    styleUrls: ['./voice-recorder.scss'],
    providers: [
        Iwe7JssdkRecordService
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
    localId: string;
    serveId: string;

    showPreview: boolean = false;
    @Input() title: string = '长按录音';
    @Input() confirmTitle: string = '录音完成';
    // 上传录音url
    @Input() url: string;

    sending: boolean = false;
    constructor(
        injector: Injector,
        public cd: ChangeDetectorRef,
        public menu: Iwe7MenuService,
        public platform: Iwe7Platform,
        public record: Iwe7JssdkRecordService,
        public jssdk: Iwe7JssdkService,
        public mask: Iwe7MaskService,
        public voice: Iwe7JssdkVoiceService
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
        const { timeLen, localId, serveId } = this._customData;
        if (timeLen > 0) {
            this.pressTime = timeLen;
            this.serveId = serveId;
            this.localId = localId;
            this.showTip = false;
            this.showPreview = true;
            this.title = this.confirmTitle;
        }
    }

    // 发送
    sure(e: any) {
        if (this.localId) {
            this.send();
        } else {
            this.emit();
        }
    }
    // 取消
    cancel(e: any) {
        this.sending = false;
        this._customClose(this._customData);
    }
    // 返回重录
    back(e: any) {
        this.sending = false;
        this.showPreview = false;
        this.showTip = false;
        this.pressTime = 0;
        this.localId = undefined;
        this.serveId = undefined;
    }
    // 播放
    playStatus: string = 'stop';
    play(e: any) {
        this.playStatus = 'playing';
        this.cd.markForCheck();
        console.log(this.playStatus);
        this.voice.play(this.localId).subscribe(res => {
            this.playStatus = res;
            console.log(this.playStatus);
            this.cd.markForCheck();
        });
    }

    stop(e: any) {
        this.voice.pause(this.localId);
    }

    emit() {
        this._customData = {
            serveId: this.serveId,
            localId: this.localId,
            timeLen: this.pressTime
        };
        this._customClose(this._customData);
        this.sending = false;
    }
    // 上传录音到服务器
    send() {
        if (this.sending) {
            return;
        }
        this.sending = true;
        if (this.localId) {
            if (this.serveId) {
                this.emit();
                return;
            }
            this.record.upload(this.localId).pipe(
                tap(res => {
                    this.serveId = res;
                })
            ).subscribe(res => {
                this.emit();
                this.sending = false;
            });
        }
    }
    // 触发长按
    onPress(e: any) {
        this.showTip = true;
        this.showPreview = false;
        this.localId = undefined;
        this.serveId = undefined;
        this.pressTime = 0;
        this.record.start().subscribe(res => {
            this.localId = res;
        });
        this.cd.markForCheck();
    }
    // 结束长按
    onRelease(e: any) {
        this.record.stop();
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
