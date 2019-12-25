import { FormControl } from '@angular/forms';
export interface MessageDialogFormControls {
    sender: FormControl,
    subject?: FormControl,
    body: FormControl,
    recipients: FormControl,
    cc?: FormControl,
    bcc?: FormControl
}