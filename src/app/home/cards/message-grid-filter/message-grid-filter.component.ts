import { MessageGridService } from './../message-grid/message-grid.service';
import { HomeService } from './../../../services/home.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'home-card-message-grid-filter',
  templateUrl: './message-grid-filter.component.html',
  styleUrls: ['./message-grid-filter.component.less']
})
export class MessageGridFilterComponent implements OnInit, AfterViewInit {
  todayFrom: string;
  todayTo: string;

  @ViewChild('senderText', null)
  senderText: ElementRef

  @ViewChild('subjectText', null)
  subjectText: ElementRef

  @ViewChild('mailCB', null)
  mailCB: ElementRef

  @ViewChild('smsCB', null)
  smsCB: ElementRef

  @ViewChild('failedCB', null)
  failedCB: ElementRef

  constructor(
    public homeService: HomeService,
    private messageGridService: MessageGridService,
    private storageService: StorageService
  ) {
    homeService.homeData$
      .subscribe(hd => {
        this.todayFrom = new Date(hd.messageFilter.from).toISOString().slice(0, 16);
        this.todayTo = new Date(hd.messageFilter.to).toISOString().slice(0, 16);
      })
      .unsubscribe();
  }

  ngOnInit() {
    let viewDate = this.storageService.retrieveViewDateFromLocalStorage();
    if (viewDate && new Date(viewDate).toDateString() !== new Date().toDateString()) {
      viewDate = new Date();
      return;
    }

    let storageHomeData = this.storageService.retrieveFromLocalStorage();

    let mf = storageHomeData.messageFilter;
    if (typeof mf !== 'undefined') {
      if (typeof mf.from !== 'undefined') {
        let from = new Date(mf.from);

        from.setHours(from.getHours() + 2);

        this.todayFrom = from.toISOString().slice(0, 16);
        this.homeService.setFrom(from);
      }

      if (typeof mf.to !== 'undefined') {
        let to = new Date(mf.to);

        to.setHours(to.getHours() + 2);

        this.todayTo = new Date(to).toISOString().slice(0, 16);
        this.homeService.setTo(to);
      }

      if (typeof mf.sender !== 'undefined') {
        this.senderText.nativeElement.value = mf.sender;
        this.homeService.setSender(mf.sender);
      }

      if (typeof mf.subject !== 'undefined') {
        this.subjectText.nativeElement.value = mf.subject;
        this.homeService.setSubject(mf.subject);
      }

      if (typeof mf.mail !== 'undefined') {
        this.mailCB.nativeElement.checked = mf.mail;
        this.homeService.setType('MAIL', mf.mail);
      }

      if (typeof mf.sms !== 'undefined') {
        (<HTMLInputElement>this.smsCB.nativeElement).checked = mf.sms;
        this.homeService.setType('SMS', mf.sms);
      }

      if (typeof mf.failed !== 'undefined') {
        (<HTMLInputElement>this.failedCB.nativeElement).checked = mf.failed;
        this.homeService.setFailed(mf.failed);
      }
    }
  }

  ngAfterViewInit(): void {
    const senderText$ = fromEvent(this.senderText.nativeElement, 'keyup')
      .pipe(
        map(e => (e as Event).target['value'] as string),
        filter(str => str.length >= 3 || !str),
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe(str => {
        this.homeService.setSender(str);
        this.messageGridService.refresh();
      });

    const subjectText$ = fromEvent(this.subjectText.nativeElement, 'keyup')
      .pipe(
        map(e => (e as Event).target['value'] as string),
        filter(str => str.length >= 3 || !str),
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe(str => {
        this.homeService.setSubject(str);
        this.messageGridService.refresh();
      });

    const mailCB$ = fromEvent(this.mailCB.nativeElement, 'click')
      .pipe(
        map(e => (e as Event).target['checked'] as boolean),
      )
      .subscribe(isMail => {
        this.homeService.setType('MAIL', isMail);
        this.messageGridService.refresh();
      });

    const smsCB$ = fromEvent(this.smsCB.nativeElement, 'click')
      .pipe(
        map(e => (e as Event).target['checked'] as boolean),
      )
      .subscribe(isSMS => {
        this.homeService.setType('SMS', isSMS);
        this.messageGridService.refresh();
      });

    const failedCB$ = fromEvent(this.failedCB.nativeElement, 'click')
      .pipe(
        map(e => (e as Event).target['checked'] as boolean),
      )
      .subscribe(isFailed => {
        this.homeService.setFailed(isFailed)
        this.messageGridService.refresh();
      });
  }
}
