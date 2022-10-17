import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalQualityComponent } from './modal-quality.component';

describe('ModalQualityComponent', () => {
  let component: ModalQualityComponent;
  let fixture: ComponentFixture<ModalQualityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalQualityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalQualityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
