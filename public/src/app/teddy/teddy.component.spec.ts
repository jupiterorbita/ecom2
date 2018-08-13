import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeddyComponent } from './teddy.component';

describe('TeddyComponent', () => {
  let component: TeddyComponent;
  let fixture: ComponentFixture<TeddyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeddyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeddyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
