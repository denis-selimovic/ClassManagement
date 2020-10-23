import {Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {Router} from '@angular/router';
import {Course} from '../../../services/course/course.service';
import {UserService} from '../../../services/user/user.service';
import {AssignmentUploadComponent} from '../../input/assignment-upload/assignment-upload.component';
import {LessonService} from '../../../services/lesson/lesson.service';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})
export class LessonsComponent implements OnInit {

  uploadRef: ComponentRef<AssignmentUploadComponent>;
  @ViewChild('upload', { read: ViewContainerRef }) upload: ViewContainerRef;

  course: Course;

  constructor(private router: Router, private userService: UserService,
              private factory: ComponentFactoryResolver) {
    this.course = this.router.getCurrentNavigation().extras.state.course;
  }

  ngOnInit(): void {
  }

  checkOwnership(): boolean {
    return this.course.owner === this.userService.getUser()._id;
  }

  addLesson($event: any): void {
    this.course.lessons = [...this.course.lessons, $event];
  }


  showUploadForm($event: any): void {
    if (!this.uploadRef) {
      const uploadComponent = this.factory.resolveComponentFactory(AssignmentUploadComponent);
      this.uploadRef = this.upload.createComponent(uploadComponent);
    }
    this.uploadRef.instance.entity = $event;
    this.uploadRef.instance.entityType = 1;
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
