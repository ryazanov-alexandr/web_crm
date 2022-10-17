import { Pipe, PipeTransform } from '@angular/core';
import { Lead } from '../models/lead';

@Pipe({
  name: 'processing'
})
export class ProcessingPipe implements PipeTransform {

  transform(processingLeads: Lead[], processingLeadProcess: boolean, search: string): Lead[] {
    if((processingLeads && processingLeads.length == 0)) {
      return processingLeads;
    }
    let tmp: Lead[] = processingLeads;

    if(processingLeadProcess) {
      tmp = tmp.filter((lead) => lead.is_express_delivery);
    }
     
    if(search != "") {
      tmp = tmp.filter(_ => _.link == search || _.phone == search);
    }

    return tmp;
  }

}
