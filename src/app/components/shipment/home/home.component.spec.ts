import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentHomeComponent } from './home.component';

describe('ShipmentHomeComponent', () => {
  let component: ShipmentHomeComponent;
  let fixture: ComponentFixture<ShipmentHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipmentHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
