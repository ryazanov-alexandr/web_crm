import { Pipe, PipeTransform } from '@angular/core';
import { Lead } from '../models/lead';

@Pipe({
  name: 'done'
})
export class DonePipe implements PipeTransform {

  transform(dLeads: Lead[], dLeadQuality: boolean, dLeadQualityFalse: boolean, search: string) : Lead[] {
    
    if(search == "") {

      if(dLeads && dLeads.length === 0) {
        return dLeads;
      }

      if(dLeadQuality) {
        return dLeads.filter((lead) => lead.isQualityLead);
      }

      if(dLeadQualityFalse) {
        return dLeads.filter((lead) => !lead.isQualityLead);
      }
      
      return dLeads;

    } else {
      return dLeads.filter(_ => _.link == search || _.phone == search);
    } 


  }
}
