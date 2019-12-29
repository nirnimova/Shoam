import { MessageGridFilter } from '../models/message-grid-filter.model';
import { Injectable } from '@angular/core';
import { Model, ModelFactory } from '@angular-extensions/model';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { homeData } from '../interfaces/homeData.interface';
import { realtime } from '../models/realtime/realtime.model';
import { WebsocketService } from './websocket.service';

const initialData: homeData = {
  messageRefreshRate: 60000,
  messageFilter: new MessageGridFilter(),
  realtimeData: new realtime()
}

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private model: Model<homeData>;

  homeData$: Observable<homeData>;

  constructor(
    private modelFactory: ModelFactory<homeData>,
    private storageService: StorageService,
    wsService: WebsocketService
  ) {
    this.model = this.modelFactory.create(initialData);
    this.homeData$ = this.model.data$;

    wsService.connect('ws://localhost:8181').subscribe(wsMsg => {
      // console.log(wsMsg.data + ' NIR')

      const hd = this.model.get();

      // console.log(hd);

      hd.realtimeData = <realtime>JSON.parse(wsMsg.data);

      // console.log(hd);

      this.model.set(hd);
    })
  }

  setFrom(date: Date) {
    const hd = this.model.get();

    hd.messageFilter.from = new Date(date);

    this.storageService.storeOnLocalStorage(hd);
    this.model.set(hd);
  }

  setTo(date: Date) {
    const hd = this.model.get();

    hd.messageFilter.to = new Date(date);

    this.storageService.storeOnLocalStorage(hd);
    this.model.set(hd);
  }

  setSender(str: string) {
    const hd = this.model.get();

    hd.messageFilter.sender = str;

    this.storageService.storeOnLocalStorage(hd);
    this.model.set(hd);
  }

  setSubject(str: string) {
    const hd = this.model.get();

    hd.messageFilter.subject = str;

    this.storageService.storeOnLocalStorage(hd);
    this.model.set(hd);
  }

  setType(type: 'MAIL' | 'SMS', filter: boolean) {
    const hd = this.model.get();

    switch (type) {
      case 'MAIL':
        hd.messageFilter.mail = filter;
        break;

      case 'SMS':
        hd.messageFilter.sms = filter;
        break;
    }

    this.storageService.storeOnLocalStorage(hd);
    this.model.set(hd);
  }

  setFailed(filter: boolean) {
    const hd = this.model.get();

    hd.messageFilter.failed = filter;

    this.storageService.storeOnLocalStorage(hd);
    this.model.set(hd);
  }
}