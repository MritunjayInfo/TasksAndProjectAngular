import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { ProjectComponent } from './component/project/project.component';
import { TaskComponent } from './component/task/task.component';

const routes: Routes = [
  
  {path:'',redirectTo:'project',pathMatch:'full'},
  {path:'home',component: HomeComponent},
  {path:'project',component:ProjectComponent},
  {path:'task/:id',component:TaskComponent}, 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
