import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminheadComponent } from './adminhead.component';

describe('AdminheadComponent', () => {
  let component: AdminheadComponent;
  let fixture: ComponentFixture<AdminheadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminheadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
