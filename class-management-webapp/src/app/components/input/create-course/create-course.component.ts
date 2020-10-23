import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {CourseService} from '../../../services/course/course.service';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {

  courseForm: FormGroup;
  failedCreation = false;

  constructor(private formBuilder: FormBuilder, private courseService: CourseService) {
    this.courseForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  createCourse(): void {
    this.courseService.create(this.courseForm.get('name').value, this.courseForm.get('description').value).subscribe(data => {
      this.courseForm.reset();
    }).error(error => this.failedCreation = true);
  }
}
