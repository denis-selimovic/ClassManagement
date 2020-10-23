import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-lesson-item',
  templateUrl: './lesson-item.component.html',
  styleUrls: ['./lesson-item.component.css']
})
export class LessonItemComponent implements OnInit {

  @Input() lesson: any;

  constructor() { }

  ngOnInit(): void {
  }

}
