import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbAccordion, NgbPanelChangeEvent} from '@ng-bootstrap/ng-bootstrap';
import { saveAs } from 'file-saver';
import {AssignmentService} from '../../../services/assignment/assignment.service';
import {UserService} from '../../../services/user/user.service';

@Component({
  selector: 'app-assignment-list-item',
  templateUrl: './assignment-list-item.component.html',
  styleUrls: ['./assignment-list-item.component.css']
})
export class AssignmentListItemComponent implements OnInit {

  @Input() assignment: any;
  @Input() name: any;
  @Input() owner: any;
  @Output() uploadEvent: EventEmitter<any> = new EventEmitter<any>();

  upload: any;

  constructor(private assignmentService: AssignmentService, private userService: UserService) { }

  ngOnInit(): void {
  }

  load($event: NgbPanelChangeEvent): void {
    const { nextState } = $event;
    if (!nextState) {
      return;
    }
    this.assignmentService.loadSetup(this.assignment._id).subscribe(u => this.upload = u);
  }


  toggle($event: MouseEvent, a: NgbAccordion, panel: string): void {
    $event.preventDefault();
    (a.isExpanded(panel)) ? a.collapse(panel) : a.expand(panel);
  }


  openUploadForm(): void {
    this.uploadEvent.emit(this.assignment);
  }

  downloadUpload(): void {
    const blob = new Blob([this.upload.data], { type: this.upload.mimetype });
    saveAs(blob, this.upload.name);
  }

  checkOwnership(): boolean {
    return this.owner === this.userService.getUser()._id;
  }
}
