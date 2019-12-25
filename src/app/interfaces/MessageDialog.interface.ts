import { MessageDialogFormControls } from './MessageDialogFormControls.interface'

export interface MessageDialog {
    swalPreConfirm: () => Promise<void>;
    addNewRecipient: (recipient: string) => void;
    addNewCC?: (cc: string) => void;
    addNewBCC?: (cc: string) => void;
  }