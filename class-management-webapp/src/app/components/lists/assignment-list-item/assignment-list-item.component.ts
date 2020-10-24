import {Component, Input, OnInit} from '@angular/core';
import {NgbAccordion, NgbPanelChangeEvent} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-assignment-list-item',
  templateUrl: './assignment-list-item.component.html',
  styleUrls: ['./assignment-list-item.component.css']
})
export class AssignmentListItemComponent implements OnInit {

  @Input() assignment: any;
  @Input() name: any;

  upload = {};

  constructor() { }

  ngOnInit(): void {
  }

  load($event: NgbPanelChangeEvent): void {

  }


  toggle($event: MouseEvent, a: NgbAccordion, upload: string): void {

  }


  openUploadForm(): void {

  }

  downloadUpload(key: string): void {

  }
}
