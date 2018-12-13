import { Injectable } from '@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { AppService } from '../app.service';
@Injectable({
  providedIn: 'root'
})
export class LandingPageService {

  constructor(
    private http: HttpClient,
    private appService: AppService
  ) { }



  postSpeechToText(payload) {
    return this.appService.postWithAuthen('speech/base64', payload);
  }

  postTextToSpeech(payload) {
    return this.appService.postWithAuthen('speech/audio', payload);
  }

  getWakeup() {
    return this.appService.getWithAuthen('wakeup/database', []);
  }

  sleep() {
    return this.appService.getWithAuthen('wakeup/sleep', []);
  }
}
