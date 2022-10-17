import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalArchiveTaskHistoryComponent } from './modal-archive-task-history.component';

describe('ModalArchiveTaskHistoryComponent', () => {
  let component: ModalArchiveTaskHistoryComponent;
  let fixture: ComponentFixture<ModalArchiveTaskHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalArchiveTaskHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalArchiveTaskHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
