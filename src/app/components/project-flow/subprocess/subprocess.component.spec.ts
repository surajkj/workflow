import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubprocessComponent } from './subprocess.component';

describe('SubprocessComponent', () => {
  let component: SubprocessComponent;
  let fixture: ComponentFixture<SubprocessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubprocessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubprocessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
