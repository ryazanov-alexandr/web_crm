import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTaskHistoryComponent } from './modal-task-history.component';

describe('ModalTaskHistoryComponent', () => {
  let component: ModalTaskHistoryComponent;
  let fixture: ComponentFixture<ModalTaskHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalTaskHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTaskHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
