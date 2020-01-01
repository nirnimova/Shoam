import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket'
import { realtime } from '../models/realtime/realtime.model';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private subject: WebSocketSubject<any>;

  constructor() { }

  public connect(url): WebSocketSubject<realtime> {
    if (!this.subject) {
      this.subject = webSocket(url);
      console.log("Successfully connected: " + url);
    }
    return this.subject;
  }
}
