import { Component, OnInit } from '@angular/core';
import { faSms, faEnvelope } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'sidebar-icon-area',
  templateUrl: './sidebar-icon-area.component.html',
  styleUrls: ['./sidebar-icon-area.component.less']
})
export class SidebarIconAreaComponent implements OnInit {

  faSms = faSms;
  faEnvelop = faEnvelope;
  constructor() { }

  ngOnInit() {
  }

}
