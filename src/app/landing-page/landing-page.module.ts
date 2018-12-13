import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingPageRoutingModule } from './landing-page-routing.module';
import { HomeComponent } from '../landing-page/home/home.component';
import { CategoryComponent } from './category/category.component';
import { Observable } from 'rxjs/Observable';
import {
  IMqttMessage,
  MqttModule,
  IMqttServiceOptions,
  MqttService
} from 'ngx-mqtt';

export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: 'broker.hivemq.com',
  port: 8000,
  path: '/mirror/wakeup',
};


@NgModule({
  imports: [
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
    CommonModule,
    LandingPageRoutingModule
  ],
  providers: [
    MqttService
    // RxSpeechRecognitionService,
  ],
  declarations: [HomeComponent, CategoryComponent]
})
export class LandingPageModule { }
