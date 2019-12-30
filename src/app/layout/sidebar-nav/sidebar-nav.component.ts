import { MessagesService } from './../../services/messages.service';
import { Message } from 'src/app/models/message.model';
import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import 'sweetalert2'
import { SwalPortalTargets, SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import * as Waves from 'node-waves';
import { FormControl, Validators, FormArray } from '@angular/forms';
import { timer } from 'rxjs';
import Swal from 'sweetalert2';
import { MessageDialog } from '../../interfaces/MessageDialog.interface';
import { MessageDialogFormControls } from 'src/app/interfaces/MessageDialogFormControls.interface';
import { MessageGridService } from 'src/app/home/cards/message-grid/message-grid.service';

//@@ SMS Dialog
const smsRecipients = new Set<string>();

const smsDialogFormControls: MessageDialogFormControls = {
  sender: new FormControl('', [Validators.required, Validators.minLength(10), Validators.pattern('\\d+')]),
  body: new FormControl('', [Validators.required]),
  recipients: new FormControl('', [Validators.required])
}

const smsDialog: MessageDialog = {
  swalPreConfirm: () => timer(500).toPromise().then(() => {
    if (smsDialogFormControls.sender.invalid) {
      Swal.showValidationMessage("Invalid Sender");
    }
    else if (smsDialogFormControls.body.invalid) {
      Swal.showValidationMessage("Please Enter Message Body");
    }
    else if (smsDialogFormControls.recipients.invalid) {
      Swal.showValidationMessage("Please Add Recipients");
    }
  }),
  addNewRecipient: (recipient: string) => {
    smsRecipients.add(recipient);
    smsDialogFormControls.recipients.setValue(JSON.stringify(smsRecipients));
  }
}

//@@ Mail Dialog
const mailRecipients = new Set<string>();
const mailCC = new Set<string>();
const mailBCC = new Set<string>();

const mailDialogFormControls: MessageDialogFormControls = {
  sender: new FormControl('', [Validators.required, Validators.email]),
  body: new FormControl('', [Validators.required]),
  subject: new FormControl('', [Validators.required]),
  recipients: new FormControl('', [Validators.required]),
  cc: new FormControl(),
  bcc: new FormControl()
}

const mailDialog: MessageDialog = {
  swalPreConfirm: () => timer(500).toPromise().then(() => {
    if (mailDialogFormControls.sender.invalid) {
      Swal.showValidationMessage("Invalid Sender");
    }
    else if (mailDialogFormControls.body.invalid) {
      Swal.showValidationMessage("Please Enter Message Body");
    }
    else if (mailDialogFormControls.recipients.invalid) {
      Swal.showValidationMessage("Please Add Recipients");
    }
  }),
  addNewRecipient: (recipient: string) => {
    mailRecipients.add(recipient);
    mailDialogFormControls.recipients.setValue(JSON.stringify(mailRecipients));
  },
  addNewCC: (cc: string) => {
    mailCC.add(cc);
    mailDialogFormControls.cc.setValue(JSON.stringify(mailCC));
  },
  addNewBCC: (bcc: string) => {
    mailBCC.add(bcc);
    mailDialogFormControls.bcc.setValue(JSON.stringify(mailBCC));
  }
}

@Component({
  selector: 'sidebar-nav',
  templateUrl: './sidebar-nav.component.html',
  styleUrls: ['./sidebar-nav.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class SidebarNavComponent implements OnInit {
  //@@ SMS Dialog
  smsDialog = smsDialog;
  smsDialogFormControls = smsDialogFormControls;
  smsRecipients = smsRecipients;

  //@@ Mail Dialog
  mailDialog = mailDialog;
  mailDialogFormControls = mailDialogFormControls;
  mailRecipients = mailRecipients;
  mailCC = mailCC;
  mailBCC = mailBCC;

  constructor(
    private messagesService: MessagesService,
    private messageGridService: MessageGridService,
    public readonly swalTargets: SwalPortalTargets
  ) {
    this.smsDialog.swalPreConfirm = this.smsDialog.swalPreConfirm.bind(this);
    this.mailDialog.swalPreConfirm = this.mailDialog.swalPreConfirm.bind(this);
  }

  @ViewChild('mailCCSwal', null) private mailCCSwal: SwalComponent;
  @ViewChild('files', null) private files: ElementRef

  ngOnInit() {
    var wavesConfig = {
      duration: 500,
      delay: 2000
    };

    Waves.attach('sidebar-nav .menu a', ['waves-button', 'waves-float']);
    Waves.init(wavesConfig);
  }

  createSMS() {
    let message = new Message(
      null,
      new Date(),
      smsDialogFormControls.sender.value,
      Array.from(smsRecipients),
      null,
      null,
      'SMS Message',
      smsDialogFormControls.body.value,
      null, // @@ TODO
      'In Progress'
    );

    this.messagesService.CreateMessage(message).subscribe(
      () => Swal.fire('Success', 'Message Created Successfully', 'success'),
      err => Swal.fire('Error', `Error Occured, Message Creation Failed: ${err.message}`),
      () => {
        this.cancelSMS();
        this.messageGridService.refresh();
      }
    );
  }

  createMail() {
    this.mailCCSwal.fire().then(() => {
      let message = new Message(
        null,
        new Date(),
        mailDialogFormControls.sender.value,
        Array.from(mailRecipients),
        Array.from(mailCC),
        Array.from(mailBCC),
        mailDialogFormControls.subject.value,
        mailDialogFormControls.body.value,
        null, // @@ TODO
        'In Progress'
      );

      //@@ Nir TEMP
      // let data = asFormData(JSON.parse(JSON.stringify(message)));

      // let uploadedFiles = (<HTMLInputElement>this.files.nativeElement).files;

      // for (let i = 0; i < uploadedFiles.length; i++){
      //   data.append(i.toString(), uploadedFiles[i]);
      // }

      // this.messagesService.Test(data).subscribe(
      //   () => alert('success'),
      //   () => alert('failure'),
      //   () => alert('complete')
      // );

      this.messagesService.CreateMessage(message).subscribe(
        () => Swal.fire('Success', 'Message Created Successfully', 'success'),
        err => Swal.fire('Error', `Error Occured, Message Creation Failed: ${err.message}`),
        () => {
          this.cancelMail();
          this.messageGridService.refresh();
        }
      );
    });
  }

  cancelSMS() {
    smsDialogFormControls.sender.setValue('');
    smsDialogFormControls.body.setValue('');
    smsDialogFormControls.recipients.setValue('');

    smsRecipients.clear();
  }

  cancelMail() {
    mailDialogFormControls.sender.setValue('');
    mailDialogFormControls.body.setValue('');
    mailDialogFormControls.recipients.setValue('');
    mailDialogFormControls.cc.setValue('');
    mailDialogFormControls.bcc.setValue('');

    mailRecipients.clear();
    mailCC.clear();
    mailBCC.clear();
  }
}
