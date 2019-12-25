import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageGridFilterComponent } from './message-grid-filter.component';

describe('MessageGridFilterComponent', () => {
  let component: MessageGridFilterComponent;
  let fixture: ComponentFixture<MessageGridFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageGridFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageGridFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
