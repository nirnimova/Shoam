import { MessageGridFilter } from '../models/message-grid-filter.model';
import { Injectable } from '@angular/core';
import { Model, ModelFactory } from '@angular-extensions/model';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { homeData } from '../interfaces/homeData.interface';

const initialData: homeData = {
  messageRefreshRate: 60000,
  messageFilter: new MessageGridFilter()
}

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private model: Model<homeData>;

  homeData$: Observable<homeData>;

  constructor(
    private modelFactory: ModelFactory<homeData>,
    private storageService: StorageService
  ) {
    this.model = this.modelFactory.create(initialData);
    this.homeData$ = this.model.data$;
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