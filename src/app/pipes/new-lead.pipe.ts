import { Pipe, PipeTransform } from '@angular/core';
import { Lead } from '../models/lead';

@Pipe({
  name: 'newLead'
})
export class NewLeadPipe implements PipeTransform {

  transform(nLeads: Lead[], leadExpress: boolean, search: string): Lead[] {
    if(nLeads && nLeads.length === 0) {
      return nLeads;
    }

    let tmp: Lead[] = nLeads;

    if(leadExpress) {
      tmp = tmp.filter(_ => _.is_express_delivery);
    }
      
    if(search != "") {
      tmp = tmp.filter(_ => _.link == search || _.phone == search);
    }
  
    return tmp;

  }

}
