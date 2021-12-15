import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManifestHomeComponent } from './home.component';

describe('ManifestHomeComponent', () => {
  let component: ManifestHomeComponent;
  let fixture: ComponentFixture<ManifestHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManifestHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManifestHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
