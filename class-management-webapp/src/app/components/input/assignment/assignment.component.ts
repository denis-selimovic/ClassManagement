import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {AssignmentService} from '../../../services/assignment/assignment.service';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent implements OnInit {

  @Input() id: any;
  @Output() create: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;

  constructor(private forumBuilder: FormBuilder, private assignmentService: AssignmentService) {
    this.form = this.forumBuilder.group({
      name: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  createAssignment(): void {
    const formDate = this.form.get('date').value;
    const dueDate = new Date(formDate.year, formDate.month - 1, formDate.day, 23, 59, 59);
    const extensions = 'pdf,zip,rar,doc,docx';
    const assignment = { name: this.form.get('name').value, dueDate, extensions };
    this.assignmentService.create(this.id, assignment).subscribe(a => this.create.emit(a), error => {});
  }
}
