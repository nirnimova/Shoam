import { MessageGridService } from './message-grid.service';
import { filter, map } from 'rxjs/operators';
import { HomeService } from './../../../services/home.service';
import { MessagesService } from './../../../services/messages.service';
import { ExpandableRowComponent } from './expandable-row/expandable-row.component';
import { Component, OnInit, Input, ViewChild, ComponentFactoryResolver, ViewContainerRef, Renderer2, ComponentRef, OnDestroy } from '@angular/core';
import { faSearch, faFileDownload, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import 'datatables.net';
import 'datatables.net-bs4';
import 'datatables.net-responsive-bs4';
import 'datatables.net-scroller-bs4';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from "ngx-spinner";
import { Message } from 'src/app/models/message.model';
import { Subject, Subscription, Observable, interval } from 'rxjs';

@Component({
  selector: 'home-card-message-grid',
  templateUrl: './message-grid.component.html',
  styleUrls: ['./message-grid.component.less']
})

export class MessageGridComponent implements OnInit, OnDestroy {
  faSearch = faSearch;
  faFileDownload = faFileDownload;

  dtOptions: DataTables.Settings = {
    scrollY: "730px",
    scrollX: false,
    info: false,
    lengthChange: false,
    searching: false,
    pageLength: 50
  };

  messagesData: any = new Array<Message>();
  subscription: Subscription;

  private childRow: ComponentRef<ExpandableRowComponent>;

  @ViewChild(DataTableDirective, null)
  private datatableElement: DataTableDirective;

  dtTrigger: Subject<Message> = new Subject<Message>();

  constructor(
    private messagesService: MessagesService,
    private homeService: HomeService,
    private messageGridService: MessageGridService,
    private compFactory: ComponentFactoryResolver,
    private viewRef: ViewContainerRef,
    private _renderer: Renderer2,
    private spinner: NgxSpinnerService
  ) {

  }

  ngOnInit() {
    let messageRefreshRate;

    this.subscription = this.homeService.homeData$.subscribe(hd => messageRefreshRate = hd.messageRefreshRate);

    this.LoadMessages();
    this.messageGridService.change.subscribe(() => this.LoadMessages(true));

    interval(messageRefreshRate).subscribe(() => this.LoadMessages(true));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.dtTrigger.unsubscribe();
  }

  LoadMessages(reRender = false) {
    this.spinner.show();

    //@@ Nir: for Rerender
    if (reRender) {
      this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
        this.GetMessages();
      });
    }
    else {
      this.GetMessages();
    }
  }

  private GetMessages() {
    let messageFilter_Sender: string;
    let messageFilter_Subject: string;
    let messageFilter_Mail: boolean;
    let messageFilter_SMS: boolean;
    let messageFilter_Failed: boolean;

    this.subscription = this.homeService.homeData$.subscribe(hd => {
      messageFilter_Sender = hd.messageFilter.sender;
      messageFilter_Subject = hd.messageFilter.subject;
      messageFilter_Mail = hd.messageFilter.mail;
      messageFilter_SMS = hd.messageFilter.sms;
      messageFilter_Failed = hd.messageFilter.failed;
    });

    let messages$ = this.messagesService.GetMessages();

    messages$ = messages$.pipe(
      map(msgArr =>
        msgArr.map(msg =>
          new Message(msg.id, msg.date, msg.sender, msg.recipients, msg.cc, msg.bcc, msg.subject, msg.body, msg.attachments, msg.status)
        )
      )
    )

    messages$ = messages$
      .pipe(
        map(msgArr => {
          if (messageFilter_Sender) {
            msgArr = msgArr.filter(msg => (msg.sender) ? msg.sender.toLowerCase().indexOf(messageFilter_Sender.toLowerCase()) !== -1 : false);
          }

          if (messageFilter_Subject) {
            msgArr = msgArr.filter(msg => (msg.subject) ? msg.subject.toLowerCase().indexOf(messageFilter_Subject.toLowerCase()) !== -1 : false);
          }

          if (messageFilter_Failed) {
            msgArr = msgArr.filter(msg => msg.status === 'Failure');
          }

          if ((!messageFilter_Mail && !messageFilter_SMS) || (messageFilter_Mail && messageFilter_SMS)) {
            return msgArr;
          }

          if (!messageFilter_Mail) {
            msgArr = msgArr.filter(msg => msg.type === 'SMS');
          }
          else if (!messageFilter_SMS) {
            msgArr = msgArr.filter(msg => msg.type === 'EMAIL');
          }

          return msgArr;
        })
      );

    messages$.subscribe((data: Message[]) => {
      this.messagesData = data;

      this.dtTrigger.next();

      setTimeout(() => {
        this.spinner.hide();
      }, 1000);
    });
  }

  expandRow(trRef, rowData) {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      var row = dtInstance.row(trRef);
      if (row.child.isShown()) {
        row.child.hide();
        this._renderer.removeClass(trRef, 'shown');
      }
      else {
        let factory = this.compFactory.resolveComponentFactory(ExpandableRowComponent);
        this.childRow = this.viewRef.createComponent(factory);
        this.childRow.instance.data = rowData;
        row.child(this.childRow.location.nativeElement).show();
        this._renderer.setStyle(this.childRow.location.nativeElement.parentElement, 'max-width', '770px');
        this._renderer.addClass(trRef, 'shown');
      }
    })
  }
}
