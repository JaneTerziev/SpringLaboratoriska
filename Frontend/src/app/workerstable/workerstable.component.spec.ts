import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerstableComponent } from './workerstable.component';

describe('WorkerstableComponent', () => {
  let component: WorkerstableComponent;
  let fixture: ComponentFixture<WorkerstableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkerstableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkerstableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
