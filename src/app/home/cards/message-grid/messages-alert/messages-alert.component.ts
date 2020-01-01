import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'message-grid-messages-alert',
  templateUrl: './messages-alert.component.html',
  styleUrls: ['./messages-alert.component.scss']
})
export class MessagesAlertComponent implements OnInit {
  activated: boolean = false;

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.toggleAlerts();
  }

  toggleAlerts() {
    this.activated = !this.activated;

    this.homeService.realtimeData$.next('toggle-alerts');
  }
}
