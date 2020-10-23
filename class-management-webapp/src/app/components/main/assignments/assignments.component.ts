import {Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../../services/user/user.service';
import {AssignmentService} from '../../../services/assignment/assignment.service';
import {AssignmentUploadComponent} from '../../input/assignment-upload/assignment-upload.component';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {

  uploadRef: ComponentRef<AssignmentUploadComponent>;
  @ViewChild('upload', { read: ViewContainerRef }) upload: ViewContainerRef;

  course: any;
  assignments: any;

  constructor(private router: Router, private userService: UserService,
              private assignmentService: AssignmentService, private factory: ComponentFactoryResolver) {
    this.course = this.router.getCurrentNavigation().extras.state.course;
  }

  ngOnInit(): void {
    this.assignmentService.loadCourseAssignments(this.course._id).subscribe(assignments => this.assignments = assignments);
  }

  checkOwnership(): boolean {
    return this.course.owner === this.userService.getUser()._id;
  }

  addAssignment($event: any): void {
    this.assignments = [ ...this.assignments, $event ];
  }

  showUploadForm($event: any): void {
    if (!this.uploadRef) {
      const uploadComponent = this.factory.resolveComponentFactory(AssignmentUploadComponent);
      this.uploadRef = this.upload.createComponent(uploadComponent);
    }
    this.uploadRef.instance.entity = $event;
    this.uploadRef.instance.entityType = 2;
    this.uploadRef.instance.hide.subscribe(() => this.hideUploadForm());
    this.uploadRef.changeDetectorRef.detectChanges();
  }

  hideUploadForm(): any {
    if (this.uploadRef) {
      this.uploadRef.destroy();
      delete this.uploadRef;
    }
  }
}
