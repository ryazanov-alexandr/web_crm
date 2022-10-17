export interface LeadComment {
    id : number;
    text : string;
    user_id : number;
    lead_id : number;
    responsible_id: number;
    status_id : number;
    comment_value : string;
    is_event : number;//системный коммент или юзера
    created_at : string;
    created_at_r : string;

}