import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'message-grid-expandable-row',
  templateUrl: './expandable-row.component.html',
  styleUrls: ['./expandable-row.component.less']
})
export class ExpandableRowComponent implements OnInit {

  @Input() data: any;

  constructor() { }

  ngOnInit() {
  }

}
