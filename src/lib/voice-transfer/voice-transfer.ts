import { CustomComponent } from 'iwe7-core';
import { LayoutOutletComponent } from 'iwe7-layout';
import { Component, Injector, ViewChild } from '@angular/core';

@Component({
    selector: 'voice-transfer',
    templateUrl: 'voice-transfer.html',
    styleUrls: ['./voice-transfer.scss']
})
export class VoiceTransferComponent extends CustomComponent<any> {
    @ViewChild(LayoutOutletComponent) layout: LayoutOutletComponent;
    constructor(injector: Injector) {
        super(injector);
        this.getCyc('ngAfterViewInit').subscribe(res => {
            setInterval(() => {
                this.layout.showFooter();
                this.layout.hideHeader();
                console.log(this.layout._footerHeight);
            }, 1000);
        });
    }
}
