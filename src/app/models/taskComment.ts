export class TaskComment {
    id: number;
    text: string;
    user_id: number;
    responsible_id: number;
    task_id: number;
    priority_id: number;
    lead_id: number;
    comment_value: string;
    created_at_r: string;
    is_complete: number;
    is_event: number;//системный коммент или юзера
}