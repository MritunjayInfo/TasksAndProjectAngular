import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateTask, SelectTask, UpdateTask } from 'src/app/model/task';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-task-post',
  templateUrl: './task-post.component.html',
  styleUrls: ['./task-post.component.css']
})
export class TaskPostComponent implements OnInit {
  TaskForm!: FormGroup;
  actionbtn: string = 'save';
  Per: any;
  constructor(private service: TaskService, private formbuilder: FormBuilder,
    private dialogRef: MatDialogRef<TaskPostComponent>, @Inject(MAT_DIALOG_DATA) public editdata: any) { }

  ngOnInit(): void {
    this.showProject();
    this.TaskForm = this.formbuilder.group({
      taskId: new FormControl(''),
      taskTitle: new FormControl('', [Validators.required]),
      creator: new FormControl('', [Validators.required]),
      duration: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      finishDate: new FormControl('', [Validators.required]),
      projectId: new FormControl('', [Validators.required])
  });
  console.log(this.editdata)
    if (this.editdata) {
      this.actionbtn = 'Update';
      this.TaskForm.controls['taskId'].setValue(this.editdata.taskId);
      this.TaskForm.controls['taskTitle'].setValue(this.editdata.taskTitle);
      this.TaskForm.controls['creator'].setValue(this.editdata.creator);
      this.TaskForm.controls['duration'].setValue(this.editdata.duration);
      this.TaskForm.controls['startDate'].setValue(this.editdata.startDate);
      this.TaskForm.controls['finishDate'].setValue(this.editdata.finishDate);
      this.TaskForm.controls['projectId'].setValue(this.editdata.projectId);
    }
  }
  addCreateTask() {
    let sec = new CreateTask();
    sec.taskTitle = this.TaskForm.value.taskTitle;
    sec.creator = this.TaskForm.value.creator;
    sec.duration = this.TaskForm.value.duration;
    sec.startDate = this.TaskForm.value.startDate;
    sec.finishDate = this.TaskForm.value.finishDate;
    sec.projectId = this.TaskForm.value.projectId;

    if (!this.editdata) {
      if (this.TaskForm.valid) {
        this.service.PostTask(sec).subscribe({
          next: (res) => {
            console.log(res);
            this.TaskForm.reset();
            this.dialogRef.close('save');
          }
        })
      }
    }
    else {
      this.updateTask();
    }
  }
  updateTask() {
    let sec = new UpdateTask();
    sec.taskId = this.editdata.taskId;
    sec.taskTitle = this.TaskForm.value.taskTitle;
    sec.creator = this.TaskForm.value.creator;
    sec.duration = this.TaskForm.value.duration;
    sec.startDate = this.TaskForm.value.startDate;
    sec.finishDate = this.TaskForm.value.finishDate;
    sec.projectId = this.TaskForm.value.projectId;

    if (this.TaskForm.valid) {
      this.service.PutTask(sec).subscribe({
        next: (res) => {
          console.log(res);
          this.TaskForm.reset();
          this.dialogRef.close('update');
        }
      })
    }
  }

  showProject() {
    this.service.GetPorject().subscribe(
      (data: any) => {
        this.Per = data;
        console.log(this.Per.id)
      }
    )
  }

}
