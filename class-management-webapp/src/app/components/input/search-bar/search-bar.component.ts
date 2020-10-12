import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Course, CourseService } from '../../../services/course/course.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  formGroup: FormGroup;

  @Output() search = new EventEmitter<Array<Course>>();

  constructor(private formBuilder: FormBuilder, private courseService: CourseService) {
    this.formGroup = this.formBuilder.group({
      search: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.searchCourses();
    this.formGroup.get('search').valueChanges.subscribe(value => {
      if (!value || value === '') {
        this.searchCourses();
      }
    });
  }

  searchCoursesName(): void {
    this.courseService.loadCoursesByName(this.formGroup.get('search').value).subscribe(courses => {
      this.search.emit(courses);
    });
  }

  searchCourses(): void {
    this.courseService.loadCourses().subscribe(courses => {
      this.search.emit(courses);
    });
  }
}
