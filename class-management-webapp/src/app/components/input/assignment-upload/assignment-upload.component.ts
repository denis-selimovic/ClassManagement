import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Assignment } from '../../../services/course/course.service';
import { HttpClient } from '@angular/common/http';
import { AssignmentService } from '../../../services/assignment/assignment.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-assignment-upload',
  templateUrl: './assignment-upload.component.html',
  styleUrls: ['./assignment-upload.component.css']
})
export class AssignmentUploadComponent implements OnInit {

  @Input() assignment: Assignment;
  @Output() hide = new EventEmitter<null>();

  uploadForm: FormGroup;

  constructor(private http: HttpClient, private assignmentService: AssignmentService, private formBuilder: FormBuilder) {
    this.uploadForm = this.formBuilder.group({
      file: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  hideComponent(): void {
    this.hide.emit();
  }

  upload(): void {
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('file').value);
    this.assignmentService.upload(this.assignment._id, formData).subscribe(result => {
      console.log(result);
    });
  }
}
