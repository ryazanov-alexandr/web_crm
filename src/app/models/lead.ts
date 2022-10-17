import { Source } from "./source";
import { Status } from "./status";
import { Unit } from "./unit";

export class Lead {
    id: number;
    title: string;
    link: string;
    phone: string;
    source_id: number;
    user_id: number;
    responsible_id: number;
    is_express_delivery: boolean;
    is_add_sale: boolean;
    count_create: number;
    status_id: number;
    created_at: string;
    updated_at: string;
    source: Source;
    status: Status;
    lastComment: string;
    created_at_time: number;
    updated_at_time: number;
    isQualityLead: boolean;
    author: string;
    responsible: string;
}