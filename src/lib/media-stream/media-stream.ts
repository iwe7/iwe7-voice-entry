import { Iwe7ScriptService } from 'iwe7-script';
import { Provider } from "@angular/core";
import { CanSubject } from 'iwe7-core';
const pluginUrl: string = 'https://webrtcexperiment-webrtc.netdna-ssl.com/MediaStreamRecorder.js';
declare const MediaStreamRecorder: any;
declare const MediaRecorderWrapper: any;
declare const StereoAudioRecorder: any;
export abstract class Iwe7MediaStream extends CanSubject<any> {
    stream: MediaStream;
    constructor() {
        super();
    }
    get navigator(): Navigator {
        const navigator = (<any>window).navigator;
        navigator.getUserMedia = navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia;
        return navigator;
    }

    get URL(): any {
        const global: any = window;
        const URL = global.URL || global.webkitURL;
        return URL;
    }

    abstract init(type: string, time: number): void;
    abstract play(): void;
    abstract start(): void;
    abstract stop(): void;
}
// 谷歌浏览器
export class Iwe7ChromeMediaStream extends Iwe7MediaStream {
    instance: MediaStream;
    constructor(public script: Iwe7ScriptService) {
        super();
    }
    init(type: string = 'wav', time: number = 5): void {
        this.script.load([
            pluginUrl
        ]).pipe().subscribe(res => {
            if (res) {
                const mediaConstraints: MediaStreamConstraints = {
                    audio: true
                };
                this.navigator.getUserMedia(mediaConstraints, (stream: MediaStream) => {
                    this.stream = stream;
                    const mediaRecorder = new MediaStreamRecorder(stream);
                    mediaRecorder.stream = stream;
                    mediaRecorder.recorderType = MediaRecorderWrapper;
                    if (type === 'wav') {
                        mediaRecorder.recorderType = StereoAudioRecorder;
                        mediaRecorder.mimeType = 'audio/wav';
                    } else if (type === 'pcm') {
                        mediaRecorder.recorderType = StereoAudioRecorder;
                        mediaRecorder.mimeType = 'audio/pcm';
                    }
                    mediaRecorder.audioChannels = 1;
                    const timeInterval = time * 1000;
                    mediaRecorder.start(timeInterval);
                    mediaRecorder.ondataavailable = (res: any) => {
                        this.next({
                            name: 'ondataavailable',
                            res: res
                        });
                    };
                    this.next({
                        name: 'ready',
                        res: mediaRecorder
                    });
                }, (err) => this.error(err));
            }
        });
    }
    play() { }
    start() { }
    stop() { }
}

export class Iwe7WechatMediaStream extends Iwe7MediaStream {
    init(type: string, time: number): void { }
    play(): void {

    }
    start(): void { }
    stop(): void { }
}

export const Iwe7MediaStreamProvider: Provider = {
    provide: Iwe7MediaStream,
    useClass: Iwe7ChromeMediaStream,
    deps: [Iwe7ScriptService]
};
