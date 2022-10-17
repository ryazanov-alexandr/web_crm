import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/task';
import { parse } from 'date-fns';

@Pipe({
  name: 'selectTasks'
})
export class SelectTasksPipe implements PipeTransform {

  transform(tasks: Task[], recTasks: Task[], selected: string, selectedUserId: string, priority_id: number): Task[] {
    if((tasks && tasks.length === 0) && (recTasks && recTasks.length === 0)) {
      return [];
    }
    let todayEnd = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1);
    let now = new Date();
    let todayStart = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    let yesterdayStart = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1);
    let tomorrowStart= new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 2);
    let tempTasks: Task[] = tasks;

    switch(selected) {
      case "1": 
        //все не просроченные не выполненные
        tempTasks = tasks?.filter(function(task) {
          let due_date: Date = parse(task.due_date, 'yyyy-M-d HH:mm:ss', new Date());
          return (due_date > now && task.is_complete == false);
        });
        return selectedUserId == "-1" ? tempTasks : tempTasks.filter(_ => _.responsible_id == +selectedUserId);
      case "2": //сегодня
        tempTasks = tasks?.filter(function(task) {
          let due_date: Date = parse(task.due_date, 'yyyy-M-d HH:mm:ss', new Date());
          return (due_date >= todayStart && due_date < todayEnd && task.is_complete == false);
        })
        return selectedUserId == "-1" ? tempTasks : tempTasks.filter(_ => _.responsible_id == +selectedUserId);
      case "3": //завтра
        tempTasks = tasks?.filter(function(task) {
          let due_date: Date = parse(task.due_date, 'yyyy-M-d HH:mm:ss', new Date());
          return (due_date >= todayEnd && due_date < tomorrowStart && task.is_complete == false);
        });
        return selectedUserId == "-1" ? tempTasks : tempTasks.filter(_ => _.responsible_id == +selectedUserId);
      case "4": //послезавтра и т.д.
        tempTasks = tasks?.filter(function(task) {
          let due_date: Date = parse(task.due_date, 'yyyy-M-d HH:mm:ss', new Date());
          return (due_date >= tomorrowStart && task.is_complete == false);
        });
        return selectedUserId == "-1" ? tempTasks : tempTasks.filter(_ => _.responsible_id == +selectedUserId);
      case "5": //просроченные со вчера до сегодня
        tempTasks = tasks?.filter(function(task) {
          let due_date: Date = parse(task.due_date, 'yyyy-M-d HH:mm:ss', new Date());
          return (due_date > yesterdayStart && due_date < now && task.is_complete == false);
        });
        return selectedUserId == "-1" ? tempTasks : tempTasks.filter(_ => _.responsible_id == +selectedUserId);
      case "6": //выполненные со вчера 
       tempTasks = tasks?.filter(function(task) {
          let updated_at: Date = parse(task.updated_at, 'yyyy-M-d HH:mm:ss', new Date());
          return (updated_at > yesterdayStart && task.is_complete == true);
        });
        return selectedUserId == "-1" ? tempTasks : tempTasks.filter(_ => _.responsible_id == +selectedUserId);
      default:
        return tasks;
    }
   
  return tempTasks;
}

}
