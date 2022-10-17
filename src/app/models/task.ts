import { Lead } from "./lead";
import { Priority } from "./priority";

export class Task {
    id: number;
    title: String;
    description: string;
    author_id: number;
    responsible_id: number;
    priority_id: number;
    lead_id: number;
    time_to_complete: string;
    due_date: string;
    is_complete: boolean;
    priority: Priority;
    lead: Lead;
    author: string;
    responsible : string;
    updated_at : string;
}