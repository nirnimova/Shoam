export class Message {
    id?: string;
    type: 'EMAIL' | 'SMS';
    date: Date;
    sender: string;
    recipients: Array<string>;
    cc?: Array<string>;
    bcc?: Array<string>;
    subject: string;
    body: string;
    attachments: Array<string>;
    status: 'Suceess' | 'Failure' | 'In Progress';

    constructor(
        id: string,
        date: Date,
        sender: string,
        recipients: string[],
        cc: string[],
        bcc: string[],
        subject: string,
        body: string,
        attachments: string[],
        status: 'Suceess' | 'Failure' | 'In Progress'
    ) {
        this.id = id;
        this.type = (sender.indexOf('@') !== -1) ? 'EMAIL' : 'SMS';
        this.date = date;
        this.sender = sender;
        this.recipients = recipients;
        this.cc = cc;
        this.bcc = bcc;
        this.subject = subject;
        this.body = body;
        this.attachments = attachments;
        this.status = status;
    }
}