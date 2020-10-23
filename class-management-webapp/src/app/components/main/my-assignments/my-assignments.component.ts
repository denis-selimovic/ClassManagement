import { Component, OnInit, ViewChild, ViewContainerRef, ComponentRef, ComponentFactoryResolver } from '@angular/core';
import { AssignmentService } from '../../../services/assignment/assignment.service';
import { Assignment } from '../../../services/course/course.service';
import { AssignmentUploadComponent } from '../../input/assignment-upload/assignment-upload.component';

@Component({
  selector: 'app-my-assignments',
  templateUrl: './my-assignments.component.html',
  styleUrls: ['./my-assignments.component.css']
})
export class MyAssignmentsComponent implements OnInit {

  assignmentUploadRef: ComponentRef<AssignmentUploadComponent>;
  @ViewChild('assignmentUpload', { read: ViewContainerRef }) assignmentUpload: ViewContainerRef;

  courses: any = {};
  assignments: Array<Assignment> = [];

  constructor(private assignmentService: AssignmentService, private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
    this.assignmentService.loadMyAssignments().subscribe(courses => {
      courses.forEach(c => {
        c.assignments.forEach(a => this.assignments.push(a));
        this.courses[c._id] = c;
      });
    });
  }

  showUploadForm($event: Assignment): any {
    if (!this.assignmentUploadRef) {
      const uploadComponent = this.componentFactoryResolver.resolveComponentFactory(AssignmentUploadComponent);
      this.assignmentUploadRef = this.assignmentUpload.createComponent(uploadComponent);
    }
    this.assignmentUploadRef.instance.entity = $event;
    this.assignmentUploadRef.instance.entityType = 0;
    this.assignmentUploadRef.instance.hide.subscribe(() => this.hideUploadForm());
    this.assignmentUploadRef.changeDetectorRef.detectChanges();
  }

  hideUploadForm(): any {
    if (this.assignmentUploadRef) {
      this.assignmentUploadRef.destroy();
      delete this.assignmentUploadRef;
    }
  }
}
