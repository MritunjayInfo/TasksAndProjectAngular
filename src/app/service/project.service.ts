import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Project, UpdateProject } from '../model/project-model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  GetProject() {
    return this.http.get<any>(environment.API_URL + '/api/Project')
  }

  PostProject(project: Project) {
    return this.http.post<any>(environment.API_URL+'/api/Project',project)
  }

  PutProject(project: UpdateProject) {
    return this.http.put<any>(environment.API_URL+'/api/Project/'+project.projectId, project)
  }

  DeleteProject(id: number) {
    return this.http.delete<any>(environment.API_URL+'/api/Project?id='+id)
  }

}
