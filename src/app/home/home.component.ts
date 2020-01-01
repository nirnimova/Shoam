import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import 'src/shared/snarl/snarl.js'
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import 'src/shared/svg/plane.svg';
import { HomeService } from '../services/home.service';
import { messageNotification } from '../models/realtime/realtime-message-notification';
import { interval } from 'rxjs';
import { Queue } from '../models/datastructures/ds-queue';

declare var Snarl: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  faGlobe = faGlobe;
  messageNotifications: Queue<messageNotification> = new Queue<messageNotification>();

  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.homeService.homeData$.subscribe(hd => {
      if (hd.realtimeData.msgNotifications.length === 0) {
        return;
      }

      hd.realtimeData.msgNotifications.forEach(notification => this.messageNotifications.push(notification));
    });

    interval(10000)
      .subscribe(() => {
        let notification = this.messageNotifications.pop();

        Snarl.addNotification({ title: notification.title, text: notification.message, icon: notification.icon });
      });
  }
}
