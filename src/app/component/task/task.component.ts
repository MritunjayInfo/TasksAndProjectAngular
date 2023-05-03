import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { SelectTask } from 'src/app/model/task';
import { TaskService } from 'src/app/service/task.service';
import { TaskPostComponent } from '../task-post/task-post.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  displayedColumns: string[] = ['taskId', 'taskTitle', 'creator', 'duration', 'startDate', 'finishDate', 'action']

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('htmlData') htmlData!: ElementRef;
  row!: SelectTask;

  dataSource!: MatTableDataSource<any>;
  data: any;

  constructor(private service: TaskService, private dialog: MatDialog, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // Find the value  second table from 'id'; 
    this.activatedRoute.paramMap.subscribe(param =>{
      let pid = +param.getAll('id') // (+) converts string 'id' to number;
      this.service.GetTaskbyId(pid-1).subscribe(res =>{
        this.row = res;
      })
    })

    this.getAllTask();
  }

  getAllTask() {
    this.activatedRoute.paramMap.subscribe(param =>{
      let pid = +param.getAll('id') // (+) converts string 'id' to number;
      this.service.GetTaskbyId(pid).subscribe({
      next: (res) => {
        console.log(res);
        this.data = res;
        console.log(this.data);
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openTask() {
    this.dialog.open(TaskPostComponent, {
      width: "35%",
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getAllTask();
      }
    });
  }

  editTask(row: any) {
    this.dialog.open(TaskPostComponent, {
      width: "35%",
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getAllTask();
      }
    });
  }

  deleteTask(id: number){
    if (confirm("Are you sure?")) {
      this.service.DeleteTask(id).subscribe({
        next: (res) =>{
          this.getAllTask();
        }
      })
    }
  }

}
