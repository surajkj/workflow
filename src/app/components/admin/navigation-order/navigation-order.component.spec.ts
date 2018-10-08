import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationOrderComponent } from './navigation-order.component';

describe('NavigationOrderComponent', () => {
  let component: NavigationOrderComponent;
  let fixture: ComponentFixture<NavigationOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigationOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
