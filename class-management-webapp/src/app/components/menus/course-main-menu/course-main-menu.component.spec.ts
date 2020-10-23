import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseMainMenuComponent } from './course-main-menu.component';

describe('CourseMainMenuComponent', () => {
  let component: CourseMainMenuComponent;
  let fixture: ComponentFixture<CourseMainMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseMainMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseMainMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
