import { queuesCapacity } from './realtime-queues-capacity.model';
import { messagesFailureStatus as messagesStatus } from './realtime-messages-failure-status.model';
import { messageNotification } from './realtime-message-notification';

export class realtime {
    queues: queuesCapacity = new queuesCapacity();
    msgStatus: messagesStatus = new messagesStatus();
    msgNotifications?: messageNotification[] = [];
}