import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateTask, SelectTask, UpdateTask } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
 
  constructor(private http: HttpClient) { }

  GetTask() {
    return this.http.get<any>(environment.API_URL+'/api/Tasks')
  }

  PostTask(obj: CreateTask) {
    return this.http.post(environment.API_URL+'/api/Tasks',obj)
  }

  PutTask(obj: UpdateTask) {
    return this.http.put(environment.API_URL+'/api/Tasks/'+obj.taskId,obj)
  }

  DeleteTask(id: number) {
    return this.http.delete(environment.API_URL+'/api/Tasks?id='+id)
  }

  GetTaskbyId(id: number){
    return this.http.get<SelectTask>(environment.API_URL+'/api/Tasks/'+id)
  }

  GetPorject() {
    return this.http.get<any>(environment.API_URL + '/api/Project')
  }
}
