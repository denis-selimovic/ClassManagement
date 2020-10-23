import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Assignment } from '../../../services/course/course.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-assignment-upload',
  templateUrl: './assignment-upload.component.html',
  styleUrls: ['./assignment-upload.component.css']
})
export class AssignmentUploadComponent implements OnInit {

  @Input() entity: any;
  @Input() uploadCallback: any;
  @Output() hide = new EventEmitter<null>();

  uploadForm: FormGroup;

  private type: string = undefined;
  filename: string = undefined;

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private cd: ChangeDetectorRef) {
    this.uploadForm = this.formBuilder.group({
      file: [null, Validators.required]
    });
  }

  ngOnInit(): void {
  }

  hideComponent(): void {
    this.filename = undefined;
    this.type = undefined;
    this.hide.emit();
  }

  upload(): void {
    const formData = new FormData();
    const blob = new Blob([ this.uploadForm.get('file').value ], { type: this.type });
    formData.append('file', blob, this.filename);
    this.uploadCallback(this.entity._id, formData);
  }

  onFileChange($event: any): void {
    const reader = new FileReader();
    if ($event.target.files && $event.target.files.length) {
      const [ file ] = $event.target.files;
      this.type = file.type;
      this.filename = file.name;
      reader.readAsArrayBuffer(file);
      reader.onload = () => {
        this.uploadForm.patchValue({
          file: reader.result
        });
        this.cd.markForCheck();
      };
    }
  }

  clearForm(): void {
    this.uploadForm.setValue({
      file: null
    });
    this.filename = undefined;
  }

  checkDueDate(): boolean {
    if (!this.entity.dueDate) {
      return true;
    }
    return new Date(this.entity.dueDate).getTime() < new Date().getTime();
  }
}
