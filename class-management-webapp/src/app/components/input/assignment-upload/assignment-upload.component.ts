import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Assignment} from '../../../services/course/course.service';

@Component({
  selector: 'app-assignment-upload',
  templateUrl: './assignment-upload.component.html',
  styleUrls: ['./assignment-upload.component.css']
})
export class AssignmentUploadComponent implements OnInit {

  @Input() assignment: Assignment;
  @Output() hide = new EventEmitter<null>();

  constructor() { }

  ngOnInit(): void {
  }

}
