import { homeData } from "../interfaces/homeData.interface";
import { Inject, Injectable } from '@angular/core';
import { SESSION_STORAGE, StorageService as ss } from 'ngx-webstorage-service'

const STORAGE_KEY = 'app_storage';
const STORAGE_VIEW_DATE_KEY = 'app_view_date';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(@Inject(SESSION_STORAGE) private storage: ss) { }

  public storeOnLocalStorage(hd: homeData) {
    this.storage.set(STORAGE_KEY, hd);
    this.storage.set(STORAGE_VIEW_DATE_KEY, new Date());
  }

  public retrieveFromLocalStorage() : homeData {
    return this.storage.get(STORAGE_KEY) || {};
  }

  public retrieveViewDateFromLocalStorage() : Date {
    return this.storage.get(STORAGE_VIEW_DATE_KEY) || null;
  }
}
