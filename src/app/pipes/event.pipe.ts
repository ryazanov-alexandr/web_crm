import { Pipe, PipeTransform } from '@angular/core';
import { LeadComment } from '../models/leadComment';

@Pipe({
  name: 'event'
})
export class EventPipe implements PipeTransform {

  transform(comments: LeadComment[], type: number): LeadComment[] {
    if(!comments) {
      return comments;
    }
    return comments.filter((comment) => comment.is_event == type);
  }

}
