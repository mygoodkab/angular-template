import { Component, OnInit, HostListener, Inject } from '@angular/core';
import * as RecordRTC from 'recordrtc';
import { DomSanitizer } from '@angular/platform-browser';
import { LandingPageService } from '../landing-page.service';
import * as Audio from 'audio-play';
import { MqttService, IMqttMessage } from 'ngx-mqtt';
import { Observable } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // Lets initiate Record OBJ
  private record;
  // Will use this flag for detect recording
  private recording = false;
  // Url of Blob
  private url;
  private error;
  // speak word
  message = '. . . waiting for your command :)';
  wakeup: Boolean = false;
  intervalCall;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private _mqttService: MqttService,
    private domSanitizer: DomSanitizer,
    private ladingPageService: LandingPageService,
    // private speech: speechSynthesis,
  ) {
    // this._mqttService.observe('my/topic').subscribe((message: IMqttMessage) => {
    //   const res = message.payload.toString();
    // });
  }

  // @HostListener('click') onMouseClick() {
  //   this.monitorStatus(this.wakeup);
  // }


  async ngOnInit() {
    this.interval();
  }

  sanitize(url: string) {
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }



  initiateRecording() {
    this.wakeup = true;
    this.recording = true;
    const mediaConstraints = {
      video: false,
      audio: true
    };
    navigator.mediaDevices
      .getUserMedia(mediaConstraints)
      .then(this.successCallback.bind(this), this.errorCallback.bind(this));
  }

  /**
    * Will be called automatically.
    */
  successCallback(stream) {
    const options = {
      mimeType: 'audio/wav',
      numberOfAudioChannels: 1
    };

    // Start Actuall Recording
    const StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
    this.record = new StereoAudioRecorder(stream, options);
    this.message = 'recording. . .';
    this.record.record();
    setTimeout(() => {
      this.stopRecording();
    }, 5000);
  }

  /**
     * Stop recording.
     */
  async stopRecording() {

    this.message = 'proessing . . .';
    this.record.stop(this.processRecording.bind(this));
  }

  /**
   * processRecording Do what ever you want with blob
   * @param  {any} blob Blog
   */
  async  processRecording(blob) {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = async () => {
      const base64data = reader.result;
      // Get audio only base64
      const audio = base64data.toString().split(',')[1];
      const payload = {
        audio: audio
      };
      const res: any = await this.ladingPageService.postTextToSpeech(payload);
      // const resAudio: any = await this.ladingPageService.postTextToSpeech(payload);
      this.audioPlay(res.data.speech);
      // console.log(' Audio : ', JSON.stringify(res.data.speech));
      if (res.data.text === '') {
        this.message = `I can't hear you :(`;
      } else {
        this.message = res.data.text;
      }

      setTimeout(() => {
        this.recording = false;
        this.wakeup = false;
        this.ladingPageService.sleep();
      }, 3000);

    };
    this.url = URL.createObjectURL(blob);
  }

  errorCallback(error) {
    this.error = 'Can not play audio in your browser';
  }

  audioPlay(buffer) {
    console.log(buffer);
  }

  monitorStatus(status) {
    if (!status) {
      this.wakeup = true;
    } else {
      this.wakeup = false;
    }
  }

  interval() {
    this.intervalCall = setInterval(async () => {
      const res: any = await this.ladingPageService.getWakeup();
      if (res.data) {
        if (!this.recording) {
          this.initiateRecording();
        }
      }

    }, 1500);
  }

}
