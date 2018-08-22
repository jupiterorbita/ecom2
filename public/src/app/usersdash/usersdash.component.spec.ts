import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersdashComponent } from './usersdash.component';

describe('UsersdashComponent', () => {
  let component: UsersdashComponent;
  let fixture: ComponentFixture<UsersdashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersdashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
