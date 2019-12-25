export class MessageGridFilter {
    from: Date ;
    to: Date;
    sender: string;
    subject: string;
    mail: boolean;
    sms: boolean;
    failed: boolean;

    constructor(from: Date = new Date(), to: Date = new Date()){
        from.setHours(0,0,0,0);
        from.setHours(from.getHours() + 2)

        to.setHours(23,59,59);
        to.setHours(to.getHours() + 2);

        this.from = from;
        this.to = to;
    }
}
