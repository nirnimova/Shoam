import { MessageGridFilter } from '../models/message-grid-filter.model';
import { realtime } from '../models/realtime/realtime.model';
export interface homeData {
  messageRefreshRate: number;
  messageFilter: MessageGridFilter;
  realtimeData: realtime;
}
