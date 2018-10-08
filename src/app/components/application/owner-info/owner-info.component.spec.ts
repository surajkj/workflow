import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerInfoComponent } from './owner-info.component';

describe('OwnerInfoComponent', () => {
  let component: OwnerInfoComponent;
  let fixture: ComponentFixture<OwnerInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
