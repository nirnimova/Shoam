import { MessageGridFilter } from '../models/message-grid-filter.model';
import { Injectable } from '@angular/core';
import { Model, ModelFactory } from '@angular-extensions/model';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { homeData } from '../interfaces/homeData.interface';
import { realtime } from '../models/realtime/realtime.model';
import { WebsocketService } from './websocket.service';
import { messageNotification } from '../models/realtime/realtime-message-notification';
import { WebSocketSubject } from 'rxjs/webSocket';

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
  realtimeData$: WebSocketSubject<any>;

  constructor(
    private modelFactory: ModelFactory<homeData>,
    private storageService: StorageService,
    private wsService: WebsocketService
  ) {
    this.model = this.modelFactory.create(initialData);
    this.homeData$ = this.model.data$;

    this.realtimeData$ = this.wsService.connect('ws://localhost:8181');

    this.realtimeData$.subscribe(realtimeData => {
      const hd = this.model.get();

      hd.realtimeData = realtimeData;

      if (hd.realtimeData.msgNotifications != null && hd.realtimeData.msgNotifications.length > 0) {
        hd.realtimeData.msgNotifications = hd.realtimeData.msgNotifications.map(msgNotif => new messageNotification(msgNotif.title, msgNotif.message, msgNotif.icon));
      }

      this.model.set(hd);
    });
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