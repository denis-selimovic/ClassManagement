import {Component, Input, OnInit} from '@angular/core';
import {NgbAccordion, NgbPanelChangeEvent} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from '../../../services/user/user.service';
import { saveAs } from 'file-saver';
import {AssignmentService} from '../../../services/assignment/assignment.service';

@Component({
  selector: 'app-student-item',
  templateUrl: './student-item.component.html',
  styleUrls: ['./student-item.component.css']
})
export class StudentItemComponent implements OnInit {

  @Input() student: any;
  @Input() course: any;

  uploads = {};

  constructor(private assignmentService: AssignmentService, private userService: UserService) { }

  ngOnInit(): void {
    console.log(this.student);
    console.log(this.course);
  }

  getName(): string {
    return `${this.student.name} ${this.student.surname}`;
  }

  load($event: NgbPanelChangeEvent): void {
    const { nextState, panelId } = $event;
    if (!nextState) {
      return;
    }
    this.assignmentService.loadStudentUploads(panelId, this.student._id).subscribe(u => {
      this.uploads = {};
      u.forEach(up => this.uploads[up._id] = up);
    });
  }

  toggle($event: MouseEvent, a: NgbAccordion, id: any): void {
    $event.preventDefault();
    if (a.isExpanded(id)) {
      a.collapse(id);
    }
    else {
      a.collapseAll();
      a.expand(id);
    }
  }

  downloadUpload(key: string): void {
    const upload = this.uploads[key];
    const blob = new Blob([upload.data], { type: upload.mimetype });
    saveAs(blob, upload.name);
  }
}
