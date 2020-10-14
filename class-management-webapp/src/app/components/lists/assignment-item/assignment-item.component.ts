import { Component, Input, OnInit } from '@angular/core';
import { Assignment, Course, Upload } from '../../../services/course/course.service';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { AssignmentService } from '../../../services/assignment/assignment.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-assignment-item',
  templateUrl: './assignment-item.component.html',
  styleUrls: ['./assignment-item.component.css']
})
export class AssignmentItemComponent implements OnInit {

  @Input() assignment: Assignment;
  @Input() course: Course;

  setup: Upload;
  uploads = {};

  constructor(private assignmentService: AssignmentService) { }

  ngOnInit(): void {
  }

  load($event: NgbPanelChangeEvent): void {
    const { nextState, panelId } = $event;
    if (!nextState) {
      return;
    }
    (panelId === 'setup') ? this.loadSetup() : this.loadUploads();
  }

  loadSetup(): void {
    this.assignmentService.loadSetup(this.assignment._id).subscribe(setup => this.setup = setup);
  }


  loadUploads(): void {
    this.assignmentService.loadUploads(this.assignment._id).subscribe(uploads => {
      uploads.forEach(upload => this.uploads[upload._id] = upload);
    });
  }

  downloadSetup(): void {
    const blob = new Blob([this.setup.data], { type: this.setup.mimetype });
    saveAs(blob, this.setup.name);
  }

  downloadUpload(key: string): void {
    const upload = this.uploads[key];
    const blob = new Blob([upload.data], { type: upload.mimetype });
    saveAs(blob, upload.name);
  }
}
