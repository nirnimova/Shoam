import { Component, HostBinding, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations'

@Component({
  selector: 'home-card-queues-status',
  templateUrl: './queues-status.component.html',
  styleUrls: ['./queues-status.component.less'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        height: `${Math.random() * 100}%`
      })),
      state('closed', style({
        height: `${Math.random() * 100}%`
      })),
      transition('open => closed', [
        animate('2s')
      ]),
      transition('closed => open', [
        animate('2s')
      ]),
    ]),
  ],
})
export class QueuesStatusComponent implements OnInit {
  isOpen = true;
  isOpen2 = true;
  isOpen3 = true;

  constructor() { }

  ngOnInit() {
    setInterval(() => {
      this.isOpen = !this.isOpen;
      document.getElementById('progress-bar1').innerText = `${Math.floor(Math.random() * 100)}%`;
    }, Math.random() * 10000 + 5000);
    setInterval(() => {
      this.isOpen2 = !this.isOpen2;
      document.getElementById('progress-bar2').innerText = `${Math.floor(Math.random() * 100)}%`;
    }, Math.random() * 10000 + 5000);
    setInterval(() => {
      this.isOpen3 = !this.isOpen3;
      document.getElementById('progress-bar3').innerText = `${Math.floor(Math.random() * 100)}%`;
    }, Math.random() * 10000 + 5000);
  }

}
