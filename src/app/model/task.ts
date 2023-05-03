export class CreateTask {
    taskTitle!:string;
    creator!:string;
    duration!:number;
    startDate!:Date;
    finishDate!:Date;
    projectId!:number;
}

export class UpdateTask {
    taskId!:number;
    taskTitle!:string;
    creator!:string;
    duration!:number;
    startDate!:Date;
    finishDate!:Date;
    projectId!:number;
}

export class SelectTask{
    taskId!:number;
    taskTitle!:string;
    creator!:string;
    duration!:number;
    startDate!:Date;
    finishDate!:Date;
    projectId!:number;
}

