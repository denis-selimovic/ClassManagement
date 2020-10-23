import {Component, Input, OnInit} from '@angular/core';
import {NgbAccordion, NgbPanelChangeEvent} from '@ng-bootstrap/ng-bootstrap';
import { saveAs } from 'file-saver';
import {UserService} from '../../../services/user/user.service';
import {LessonService} from '../../../services/lesson/lesson.service';

@Component({
  selector: 'app-lesson-item',
  templateUrl: './lesson-item.component.html',
  styleUrls: ['./lesson-item.component.css']
})
export class LessonItemComponent implements OnInit {

  @Input() lesson: any;
  @Input() id: any;
  @Input() owner: any;
  uploads = {};

  constructor(private userService: UserService, private lessonService: LessonService) { }

  ngOnInit(): void {
  }

  toggle($event: MouseEvent, a: NgbAccordion, panel: string): void {
    $event.preventDefault();
    (a.isExpanded(panel)) ? a.collapse(panel) : a.expand(panel);
  }

  downloadUpload(key: string): void {
    const upload = this.uploads[key];
    const blob = new Blob([upload.data], { type: upload.mimetype });
    saveAs(blob, upload.name);
  }

  openUploadForm(): void {
  }

  load($event: NgbPanelChangeEvent): void {
    const { nextState } = $event;
    if (!nextState) {
      return;
    }
    this.lessonService.loadUploads(this.lesson._id).subscribe(uploads => {
      uploads.forEach(u => this.uploads[u._id] = u);
    });
  }

  checkOwnership(): boolean {
    return this.owner === this.userService.getUser()._id;
  }
}
