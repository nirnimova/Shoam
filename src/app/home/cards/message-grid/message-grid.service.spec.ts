import { TestBed } from '@angular/core/testing';

import { MessageGridService } from './message-grid.service';

describe('MessageGridService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MessageGridService = TestBed.get(MessageGridService);
    expect(service).toBeTruthy();
  });
});
