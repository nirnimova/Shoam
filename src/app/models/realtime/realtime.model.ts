import { queuesCapacity } from './realtime-queues-capacity.model';
import { messagesFailureStatus } from './realtime-messages-failure-status.model';

export class realtime {
    queues: queuesCapacity = new queuesCapacity();
    msgFailures: messagesFailureStatus;
}