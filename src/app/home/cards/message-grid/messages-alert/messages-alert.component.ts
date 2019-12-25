import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'message-grid-messages-alert',
  templateUrl: './messages-alert.component.html',
  styleUrls: ['./messages-alert.component.scss']
})
export class MessagesAlertComponent implements OnInit {
  activated : boolean = true;
  constructor() { }

  toggleAlerts(){
    this.activated = !this.activated;
  }

  ngOnInit() { 
  }

}
