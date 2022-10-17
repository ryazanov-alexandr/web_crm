import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSourcesComponent } from './modal-sources.component';

describe('ModalSourcesComponent', () => {
  let component: ModalSourcesComponent;
  let fixture: ComponentFixture<ModalSourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSourcesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
