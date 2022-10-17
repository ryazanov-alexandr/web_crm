import { Task } from "./task";


export interface ResponseHttpTask {
    status: boolean,
    errors: {
        message? : string
    },
    data: {
        items: {
            urgent : Task[],
            high : Task[],
            medium : Task[],
            low : Task[]
        }
    }
    
}