import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarIconAreaComponent } from './sidebar-icon-area.component';

describe('SidebarIconAreaComponent', () => {
  let component: SidebarIconAreaComponent;
  let fixture: ComponentFixture<SidebarIconAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarIconAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarIconAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
