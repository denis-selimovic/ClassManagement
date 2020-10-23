import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LessonService} from '../../../services/lesson/lesson.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-create-lesson',
  templateUrl: './create-lesson.component.html',
  styleUrls: ['./create-lesson.component.css']
})
export class CreateLessonComponent implements OnInit {
  form: FormGroup;
  failed = false;

  @Input() id: any;
  @Output() created: EventEmitter<any> = new EventEmitter();

  constructor(private formBuilder: FormBuilder, private lessonService: LessonService) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  createLesson(): void {
    this.lessonService.create(this.id, this.form.get('name').value, this.form.get('description').value).subscribe(data => {
      this.created.emit(data);
    }, error => this.failed = false);
  }
}
