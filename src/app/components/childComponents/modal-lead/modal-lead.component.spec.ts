import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLeadComponent } from './modal-lead.component';

describe('ModalLeadComponent', () => {
  let component: ModalLeadComponent;
  let fixture: ComponentFixture<ModalLeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalLeadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
