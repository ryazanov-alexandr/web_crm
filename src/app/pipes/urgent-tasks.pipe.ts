import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/task';
import { parse } from 'date-fns';

@Pipe({
  name: 'urgentTasks'
})
export class UrgentTasksPipe implements PipeTransform {

  transform(tasks: Task[], selected: string): Task[] {
      let todayEnd = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()+1);
      let now = new Date();
      let todayStart = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
      let tomorrowStart= new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()+2);
    let tempTasks: Task[];
    switch(selected) {
      case "1": 
        tempTasks = tasks;
        break;
      case "2": 
        tempTasks = tasks?.filter(function(task) {
          let due_date: Date = parse(task.due_date, 'yyyy-M-d HH:mm:ss', new Date());
          return (due_date >= todayStart && due_date < todayEnd);
        });
        break;
      case "3": 
        tempTasks = tasks?.filter(function(task) {
          let due_date: Date = parse(task.due_date, 'yyyy-M-d HH:mm:ss', new Date());
          return (due_date >= todayEnd && due_date < tomorrowStart);
        });
        break;
      case "4": 
        tempTasks = tasks?.filter(function(task) {
          let due_date: Date = parse(task.due_date, 'yyyy-M-d HH:mm:ss', new Date());
          return (due_date >= tomorrowStart);
        });
        break;
      case "5": 
        tempTasks = tasks?.filter(function(task) {
          let due_date: Date = parse(task.due_date, 'yyyy-M-d HH:mm:ss', new Date());
          return due_date < now;
        });
        break;
      case "6": 
        tempTasks = tasks?.filter(_ => _.is_complete == true);
        break;
      default:
        break;
    }
    return tempTasks;
  }

}
