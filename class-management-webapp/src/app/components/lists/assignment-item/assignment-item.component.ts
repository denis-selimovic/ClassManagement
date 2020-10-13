import { Component, Input, OnInit } from '@angular/core';
import { Assignment, Course, Upload } from '../../../services/course/course.service';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { AssignmentService } from '../../../services/assignment/assignment.service';
import * as fileSaver from 'file-saver';
import set = Reflect.set;

@Component({
  selector: 'app-assignment-item',
  templateUrl: './assignment-item.component.html',
  styleUrls: ['./assignment-item.component.css']
})
export class AssignmentItemComponent implements OnInit {

  @Input() assignment: Assignment;
  @Input() course: Course;

  setup: Upload;

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
  }

  download(): void {
    this.assignmentService.downloadSetup(this.assignment._id).subscribe(setup => {
      const blob = new Blob([setup.data], { type: setup.mimetype });
      fileSaver.saveAs(blob, this.setup.name);
    });
  }
}
