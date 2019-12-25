import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlotChartComponent } from './flot-chart.component';

describe('FlotChartComponent', () => {
  let component: FlotChartComponent;
  let fixture: ComponentFixture<FlotChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlotChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlotChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
