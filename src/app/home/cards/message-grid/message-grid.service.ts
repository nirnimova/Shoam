import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageGridService {

  @Output() change: EventEmitter<boolean> = new EventEmitter();
  
  constructor() { }

  refresh() {
    this.change.emit(true);
  }
}
