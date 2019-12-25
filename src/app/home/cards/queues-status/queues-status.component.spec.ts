import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueuesStatusComponent } from './queues-status.component';

describe('QueuesStatusComponent', () => {
  let component: QueuesStatusComponent;
  let fixture: ComponentFixture<QueuesStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueuesStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueuesStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
