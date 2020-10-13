import { Component, Input, OnInit } from '@angular/core';
import { Assignment, Course } from '../../../services/course/course.service';
import {NgbPanelChangeEvent} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-assignment-item',
  templateUrl: './assignment-item.component.html',
  styleUrls: ['./assignment-item.component.css']
})
export class AssignmentItemComponent implements OnInit {

  @Input() assignment: Assignment;
  @Input() course: Course;

  private loaderMap = { setup: this.loadSetup, upload: this.loadUploads };

  constructor() { }

  ngOnInit(): void {
  }

  load($event: NgbPanelChangeEvent): void {
    const { nextState, panelId } = $event;
    if (!nextState) {
      return;
    }
    this.loaderMap[panelId]();
  }

  loadSetup(): void {
    console.log('Panel setup');
  }

  loadUploads(): void {
    console.log('Panel upload');
  }
}
