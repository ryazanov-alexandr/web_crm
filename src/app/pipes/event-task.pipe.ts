import { Pipe, PipeTransform } from '@angular/core';
import { TaskComment } from '../models/taskComment';

@Pipe({
  name: 'eventTask'
})
export class EventTaskPipe implements PipeTransform {

  transform(comments: TaskComment[], type: number): TaskComment[] {
    if(!comments) {
      return comments;
    }
    return comments.filter((comment) => comment.is_event == type);
  }


}
