import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent implements OnInit {

  @Input() id: any;
  @Output() create: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;

  constructor(private forumBuilder: FormBuilder) {
    this.form = this.forumBuilder.group({
      name: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  createAssignment(): void {
    console.log(this.form.get('date'));
  }
}
