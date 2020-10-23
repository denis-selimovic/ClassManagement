import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedCoursesComponent } from './created-courses.component';

describe('CreatedCoursesComponent', () => {
  let component: CreatedCoursesComponent;
  let fixture: ComponentFixture<CreatedCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatedCoursesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatedCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
