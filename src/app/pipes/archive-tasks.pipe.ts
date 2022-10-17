import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/task';
import { parse } from 'date-fns';

@Pipe({
  name: 'archiveTasks'
})
export class ArchiveTasksPipe implements PipeTransform {

  transform(archiveTasks: Task[], selectedUserId: string, completeTasks: boolean, completeTasksFalse: boolean): Task[] {
    if(archiveTasks && archiveTasks.length === 0) {
      return archiveTasks;
    }

    let tempTasks: Task[] = archiveTasks;
    let yesterdayStart = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1);
    
    tempTasks = archiveTasks?.filter(function(task) {
      let due_date: Date = parse(task.due_date, 'yyyy-M-d HH:mm:ss', new Date());
      return (due_date < yesterdayStart);
    });

    tempTasks = selectedUserId == "-1" ? tempTasks : tempTasks.filter(_ => _.responsible_id == +selectedUserId);
    
    if(completeTasks) {
      return tempTasks.filter(_ => _.is_complete)
    }

    if(completeTasksFalse) {
      return tempTasks.filter(_ => !_.is_complete)
    }

    return tempTasks;
  }

}
