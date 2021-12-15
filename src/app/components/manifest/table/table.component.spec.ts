import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManifestTableComponent } from './table.component';

describe('ManifestTableComponent', () => {
  let component: ManifestTableComponent;
  let fixture: ComponentFixture<ManifestTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManifestTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManifestTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
