import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/task';

@Pipe({
  name: 'myTasks'
})
export class MyTasksPipe implements PipeTransform {

  transform(tasks : Task[], meTasks : boolean, allTasks : boolean, userId : number) {
  
    if(!tasks || (tasks && tasks.length === 0)) {
      return tasks
    }

    if(allTasks) {
      return tasks;
    }

    if(meTasks) {
      return tasks.filter(function (task) {
        if (task.author_id == userId) {
            return task;
        }
        return false;
    });
    }
    else {
      
      return tasks.filter(function (task) {
        
        if (task.responsible_id == userId) {
            return task;
        }
        return false;
    });
        
    }

    return tasks;

  }

}
