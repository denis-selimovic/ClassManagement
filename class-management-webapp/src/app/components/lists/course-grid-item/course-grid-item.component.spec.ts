import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseGridItemComponent } from './course-grid-item.component';

describe('CourseGridItemComponent', () => {
  let component: CourseGridItemComponent;
  let fixture: ComponentFixture<CourseGridItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseGridItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseGridItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
