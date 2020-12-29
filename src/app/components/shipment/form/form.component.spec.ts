import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentFormComponent } from './form.component';

describe('ShipmentFormComponent', () => {
  let component: ShipmentFormComponent;
  let fixture: ComponentFixture<ShipmentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipmentFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
