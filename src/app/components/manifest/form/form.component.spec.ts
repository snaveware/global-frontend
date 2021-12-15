import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManifestFormComponent } from './form.component';

describe('ManifestFormComponent', () => {
  let component: ManifestFormComponent;
  let fixture: ComponentFixture<ManifestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManifestFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManifestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
