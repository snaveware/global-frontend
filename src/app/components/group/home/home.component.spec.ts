import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupHomeComponent } from './home.component';

describe('GroupHomeComponent', () => {
  let component: GroupHomeComponent;
  let fixture: ComponentFixture<GroupHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
