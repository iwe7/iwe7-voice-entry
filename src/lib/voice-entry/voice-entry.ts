import { Iwe7IcssService } from 'iwe7-icss';
import { BaseWithIcss } from 'iwe7-base';
import { AfterViewInit, HostListener } from '@angular/core';
import {
    Component, OnInit,
    ChangeDetectorRef,
    Injector
} from '@angular/core';
@Component({
    selector: 'voice-entry',
    templateUrl: 'voice-entry.html',
    styleUrls: ['./voice-entry.scss'],
    providers: [Iwe7IcssService]
})
export class VoiceEntryComponent extends BaseWithIcss implements OnInit, AfterViewInit {
    // 录音数据
    timeLen: number = 0;
    localId: string;
    serveId: string;
    text: string = '不支持';
    color: string = 'accent';

    constructor(
        public cd: ChangeDetectorRef,
        injector: Injector
    ) {
        super(injector);
    }

    openVoiceRecorder(res: any) {
        this.run(() => {
            this.timeLen = res.timeLen || 0;
            this.localId = res.localId;
            this.serveId = res.serveId;
            this.color = 'primary';
            this.cd.markForCheck();
        });
    }
}
