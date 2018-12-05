import { Component, OnInit } from '@angular/core';
import * as RecordRTC from 'recordrtc';
import { DomSanitizer } from '@angular/platform-browser';
import { LandingPageService } from '../landing-page.service';

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

  constructor(
    private domSanitizer: DomSanitizer,
    private ladingPageService: LandingPageService,
  ) { }

  ngOnInit() {

  }

  sanitize(url: string) {
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }

  initiateRecording() {
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
  }

  /**
     * Stop recording.
     */
  async stopRecording() {
    this.recording = false;
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
      console.log(' Audio : ', JSON.stringify(res.data.speech));
      if (res.data.text === '') {
        this.message = `I can't hear you :(`;
      } else {
        this.message = res.data.text;
      }
    };
    this.url = URL.createObjectURL(blob);
  }

  errorCallback(error) {
    this.error = 'Can not play audio in your browser';
  }

}
