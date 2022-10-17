import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadArchiveComponent } from './lead-archive.component';

describe('LeadArchiveComponent', () => {
  let component: LeadArchiveComponent;
  let fixture: ComponentFixture<LeadArchiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadArchiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
