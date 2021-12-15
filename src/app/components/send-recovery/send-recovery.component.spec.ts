import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendRecoveryComponent } from './send-recovery.component';

describe('SendRecoveryComponent', () => {
  let component: SendRecoveryComponent;
  let fixture: ComponentFixture<SendRecoveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendRecoveryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendRecoveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
