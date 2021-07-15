import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WildcardViewComponent } from './wildcard-view.component';

describe('WildcardViewComponent', () => {
  let component: WildcardViewComponent;
  let fixture: ComponentFixture<WildcardViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WildcardViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WildcardViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
