import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUnitsComponent } from './modal-units.component';

describe('ModalUnitsComponent', () => {
  let component: ModalUnitsComponent;
  let fixture: ComponentFixture<ModalUnitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalUnitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUnitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
