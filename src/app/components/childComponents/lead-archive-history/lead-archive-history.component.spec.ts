import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadArchiveHistoryComponent } from './lead-archive-history.component';

describe('LeadArchiveHistoryComponent', () => {
  let component: LeadArchiveHistoryComponent;
  let fixture: ComponentFixture<LeadArchiveHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadArchiveHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadArchiveHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
