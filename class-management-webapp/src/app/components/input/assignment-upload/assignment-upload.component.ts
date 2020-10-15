import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Assignment } from '../../../services/course/course.service';
import { HttpClient } from '@angular/common/http';
import { AssignmentService } from '../../../services/assignment/assignment.service';

@Component({
  selector: 'app-assignment-upload',
  templateUrl: './assignment-upload.component.html',
  styleUrls: ['./assignment-upload.component.css']
})
export class AssignmentUploadComponent implements OnInit {

  @Input() assignment: Assignment;
  @Output() hide = new EventEmitter<null>();

  constructor(private http: HttpClient, private assignmentService: AssignmentService) { }

  ngOnInit(): void {
  }

  hideComponent(): void {
    this.hide.emit();
  }

  upload(): void {

  }
}
