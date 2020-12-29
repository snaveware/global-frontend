import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentViewComponent } from './view.component';

describe('ShipmentViewComponent', () => {
  let component: ShipmentViewComponent;
  let fixture: ComponentFixture<ShipmentViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipmentViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
