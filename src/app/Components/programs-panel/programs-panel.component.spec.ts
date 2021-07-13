import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramsPanelComponent } from './programs-panel.component';

describe('ProgramsPanelComponent', () => {
  let component: ProgramsPanelComponent;
  let fixture: ComponentFixture<ProgramsPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramsPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
